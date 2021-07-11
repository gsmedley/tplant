import ts from 'typescript';
import { Class } from '../Components/Class';
import { ComponentFactory } from './ComponentFactory';

export namespace ClassFactory {
    export function create(classSymbol: ts.Symbol, checker: ts.TypeChecker): Class {      
        const classDeclarations: ts.ClassDeclaration[] | undefined = <ts.ClassDeclaration[] | undefined>classSymbol.getDeclarations();
        const classDeclaration = classDeclarations === undefined ? undefined : classDeclarations[classDeclarations.length - 1]
        let name = classSymbol.getName()
        
        if (classDeclaration !== undefined && classDeclaration.name !== undefined )  {
           name = classDeclaration.name.getText()
        }

        const result: Class = new Class(name);
 
        if (classDeclaration !== undefined ) {
            result.isStatic = ComponentFactory.isStatic(classDeclaration);
            result.isAbstract = ComponentFactory.isAbstract(classDeclaration);
        }
    
        if (classSymbol.members !== undefined) {
            result.members = ComponentFactory.serializeMethods(classSymbol.members, checker);
            result.typeParameters = ComponentFactory.serializeTypeParameters(classSymbol.members, checker);
        }

        if (classSymbol.exports !== undefined) {
            result.members = result.members.concat(ComponentFactory.serializeMethods(classSymbol.exports, checker));
        }

        if (classSymbol.globalExports !== undefined) {
            result.members = result.members.concat(ComponentFactory.serializeMethods(classSymbol.globalExports, checker));
        }

        if (classDeclaration !== undefined ) {
            const heritageClauses: ts.NodeArray<ts.HeritageClause> | undefined =
                classDeclaration.heritageClauses;

            if (heritageClauses !== undefined) {
                heritageClauses.forEach((heritageClause: ts.HeritageClause): void => {
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        result.extendsClass = ComponentFactory.getExtendsHeritageClauseName(heritageClause);
                    } else if (heritageClause.token === ts.SyntaxKind.ImplementsKeyword) {
                        result.implementsInterfaces = ComponentFactory.getImplementsHeritageClauseNames(heritageClause);
                    }
                });
            }
        }

        return result;
    }
}

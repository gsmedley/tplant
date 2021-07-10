import ts from 'typescript';
import { Property } from '../Components/Property';
import { ComponentFactory } from './ComponentFactory';

export namespace PropertyFactory {
    export function create(signature: ts.Symbol, namedDeclaration: ts.NamedDeclaration, checker: ts.TypeChecker) : Property {
        const result: Property = new Property(signature.getName());
        if (signature.valueDeclaration !== undefined) {
            result.modifier = ComponentFactory.getMemberModifier(namedDeclaration);
            result.isAbstract = ComponentFactory.isAbstract(namedDeclaration);
            result.isOptional = ComponentFactory.isOptional(<ts.PropertyDeclaration>namedDeclaration);
            result.isStatic = ComponentFactory.isStatic(namedDeclaration);
            result.returnType = checker.typeToString(
                checker.getTypeOfSymbolAtLocation(
                    signature,
                    signature.valueDeclaration
                ),
                namedDeclaration
            );
        }

        return result;
    }
}

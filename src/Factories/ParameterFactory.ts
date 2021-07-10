import ts from 'typescript';
import { Parameter } from '../Components/Parameter';
import { ComponentFactory } from './ComponentFactory';

export namespace ParameterFactory {
    export function create(parameterSymbol: ts.Symbol, checker: ts.TypeChecker): Parameter {
        const result: Parameter = new Parameter(parameterSymbol.getName());

        if (parameterSymbol.valueDeclaration !== undefined) {
            const declarations: ts.ParameterDeclaration[] | undefined = <ts.ParameterDeclaration[]>parameterSymbol.getDeclarations();
            let declaration: ts.ParameterDeclaration | undefined;
            if (declarations !== undefined) {
                result.hasInitializer = ComponentFactory.hasInitializer(declarations[0]);
                result.isOptional = ComponentFactory.isOptional(declarations[0]);
                declaration = declarations[0];
            }
            result.parameterType = checker.typeToString(
                checker.getTypeOfSymbolAtLocation(
                    parameterSymbol,
                    parameterSymbol.valueDeclaration
                ),
                declaration
            );
        }

        return result;
    }
}

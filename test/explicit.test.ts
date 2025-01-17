import * as os from 'os';
import G from 'glob';
import { tplant } from '../src/tplant';

describe('Test commander options', () => {


    it('generate PlantUML with only Interfaces for Playground/Inheritance/autos.ts', () => {

        let files = G.sync("test/Playground/Inheritance/autos.ts", {})
        
        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: false, onlyInterfaces: true }))
            .toEqual(
                ['@startuml',
                    'interface IVehicle {',
                    '    +start(type: string): string',
                    '}',
                    'interface ITrunk {',
                    '    +openTrunk(): void',
                    '}',
                    'interface IWindow {',
                    '    +openWindow(): void',
                    '}',
                    '@enduml'].join(os.EOL));
    });

    it('generate PlantUML for RayTracer with compositions', () => {

        let files = G.sync("test/Playground/RayTracer/**/*.ts", {})

        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: true, onlyInterfaces: false }))
            .toEqual(
                ['@startuml',
                    'class Vector {',
                    '    +x: number',
                    '    +y: number',
                    '    +z: number',
                    '    +{static} times(k: number, v: Vector): Vector',
                    '    +{static} minus(v1: Vector, v2: Vector): Vector',
                    '    +{static} plus(v1: Vector, v2: Vector): Vector',
                    '    +{static} dot(v1: Vector, v2: Vector): number',
                    '    +{static} mag(v: Vector): number',
                    '    +{static} norm(v: Vector): Vector',
                    '    +{static} cross(v1: Vector, v2: Vector): Vector',
                    '}',
                    'class Camera {',
                    '    +forward: Vector',
                    '    +right: Vector',
                    '    +up: Vector',
                    '    +pos: Vector',
                    '}',
                    'class Color {',
                    '    +r: number',
                    '    +g: number',
                    '    +b: number',
                    '    +{static} scale(k: number, v: Color): Color',
                    '    +{static} plus(v1: Color, v2: Color): Color',
                    '    +{static} times(v1: Color, v2: Color): Color',
                    '    +{static} white: Color',
                    '    +{static} grey: Color',
                    '    +{static} black: Color',
                    '    +{static} background: Color',
                    '    +{static} defaultColor: Color',
                    '    +{static} toDrawingColor(c: Color): { r: number; g: number; b: number; }',
                    '}',
                    'interface Ray {',
                    '    +start: Vector',
                    '    +dir: Vector',
                    '}',
                    'interface Intersection {',
                    '    +thing: Thing',
                    '    +ray: Ray',
                    '    +dist: number',
                    '}',
                    'interface Surface {',
                    '    +diffuse: (pos: Vector) => Color',
                    '    +specular: (pos: Vector) => Color',
                    '    +reflect: (pos: Vector) => number',
                    '    +roughness: number',
                    '}',
                    'interface Thing {',
                    '    +intersect: (ray: Ray) => Intersection',
                    '    +normal: (pos: Vector) => Vector',
                    '    +surface: Surface',
                    '    +destroy(): void',
                    '    +destroy(name: string): void',
                    '}',
                    'interface Light {',
                    '    +pos: Vector',
                    '    +color: Color',
                    '}',
                    'interface Scene {',
                    '    +things: Thing[]',
                    '    +lights: Light[]',
                    '    +camera: Camera',
                    '}',
                    'class Plane implements Thing {',
                    '    +normal: (pos: Vector) => Vector',
                    '    +intersect: (ray: Ray) => Intersection',
                    '    +surface: Surface',
                    '}',
                    'class Sphere implements Thing {',
                    '    +radius2: number',
                    '    +center: Vector',
                    '    +surface: Surface',
                    '    +normal(pos: Vector): Vector',
                    '    +intersect(ray: Ray): { thing: this; ray: Ray; dist: number; }',
                    '}',
                    'namespace Surfaces {',
                    '}',
                    'class RayTracer {',
                    '    -maxDepth: number',
                    '    -intersections(ray: Ray, scene: Scene): Intersection',
                    '    -testRay(ray: Ray, scene: Scene): number',
                    '    -traceRay(ray: Ray, scene: Scene, depth: number): Color',
                    '    -shade(isect: Intersection, scene: Scene, depth: number): Color',
                    '    -getReflectionColor(thing: Thing, pos: Vector, normal: Vector, rd: Vector, scene: Scene, depth: number): Color',
                    '    -getNaturalColor(thing: Thing, pos: Vector, norm: Vector, rd: Vector, scene: Scene): any',
                    '    +render(scene: any, ctx: any, screenWidth: any, screenHeight: any): void',
                    '}',
                    'Camera *-- Vector',
                    'Ray *-- Vector',
                    'Intersection *-- Thing',
                    'Intersection *-- Ray',
                    'Surface *-- Vector',
                    'Surface *-- Color',
                    'Thing *-- Ray',
                    'Thing *-- Intersection',
                    'Thing *-- Vector',
                    'Thing *-- Surface',
                    'Light *-- Vector',
                    'Light *-- Color',
                    'Scene *-- Thing',
                    'Scene *-- Light',
                    'Scene *-- Camera',
                    'Plane *-- Vector',
                    'Plane *-- Ray',
                    'Plane *-- Intersection',
                    'Plane *-- Surface',
                    'Sphere *-- Vector',
                    'Sphere *-- Surface',
                    'Sphere *-- Ray',
                    'RayTracer *-- Ray',
                    'RayTracer *-- Scene',
                    'RayTracer *-- Intersection',
                    'RayTracer *-- Color',
                    'RayTracer *-- Thing',
                    'RayTracer *-- Vector',
                    '@enduml'].join(os.EOL));
    });

    it('generate PlantUML for Generics/Complex.ts with compositions', () => {

        let files = G.sync("test/Playground/Generics/Complex.ts", {})

        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: true, onlyInterfaces: false }))
            .toEqual(
                ['@startuml',
                    'interface GenericInterface<T extends string> {',
                    '    +method(arg: T): T',
                    '}',
                    'interface GenericInterface2<T extends string> {',
                    '    +property?: T',
                    '}',
                    'interface GenericInterface3<T extends string, A extends number> extends GenericInterface2 {',
                    '    +method2(arg: A): A',
                    '}',
                    'class GenericClass<T extends string, A extends number> implements GenericInterface, GenericInterface3 {',
                    '    +property?: T',
                    '    +method(arg: T): T',
                    '    +method2(arg: A): A',
                    '}',
                    'class GenericClass2<T extends string> implements GenericInterface2 {',
                    '    +property?: T',
                    '}',
                    'class ConcreteClass extends GenericClass implements GenericInterface, GenericInterface2 {',
                    '    +property: string',
                    '}',
                    'interface GenericTypes {',
                    '    +genericType: GenericClass<string, number>',
                    '    +genericType2: GenericClass2<string>',
                    '    +genericReturnType(): GenericInterface<string>',
                    '    +genericReturnType2(): GenericInterface3<string, number>',
                    '    +genericParameter(parameter: GenericInterface2<string>): void',
                    '}',
                    'GenericTypes *-- GenericClass',
                    'GenericTypes *-- GenericClass2',
                    'GenericTypes *-- GenericInterface',
                    'GenericTypes *-- GenericInterface3',
                    'GenericTypes *-- GenericInterface2',
                    '@enduml'].join(os.EOL));
    });

    it('generate PlantUML for Generics/RecursiveGenericType.ts with compositions', () => {

        let files = G.sync("test/Playground/Generics/RecursiveGenericType.ts", {})
        
        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: true, onlyInterfaces: false }))
            .toEqual(
                ['@startuml',
                    'interface FirstGeneric<T> {',
                    '    +index: T',
                    '}',
                    'interface SecondGeneric<T> {',
                    '    +index: T',
                    '}',
                    'interface ThirdGeneric<T> {',
                    '    +index: T',
                    '}',
                    'interface NormalInterface {',
                    '    +index: any',
                    '}',
                    'interface NormalInterface_2 {',
                    '    +index: any',
                    '}',
                    'interface RecursiveGenericType {',
                    '    +recursiveGenericType: string | number | FirstGeneric<SecondGeneric<ThirdGeneric<NormalInterface> | NormalInterface_2>>',
                    '}',
                    'RecursiveGenericType *-- FirstGeneric',
                    'RecursiveGenericType *-- SecondGeneric',
                    'RecursiveGenericType *-- ThirdGeneric',
                    'RecursiveGenericType *-- NormalInterface',
                    'RecursiveGenericType *-- NormalInterface_2',
                    '@enduml'].join(os.EOL));
    });

    it('generate PlantUML for RayTracer with compositions and only Interfaces', () => {

        let files = G.sync("test/Playground/RayTracer/**/*.ts", {})

        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: true, onlyInterfaces: true }))
            .toEqual(
                ['@startuml',
                    'interface Ray {',
                    '    +start: Vector',
                    '    +dir: Vector',
                    '}',
                    'interface Intersection {',
                    '    +thing: Thing',
                    '    +ray: Ray',
                    '    +dist: number',
                    '}',
                    'interface Surface {',
                    '    +diffuse: (pos: Vector) => Color',
                    '    +specular: (pos: Vector) => Color',
                    '    +reflect: (pos: Vector) => number',
                    '    +roughness: number',
                    '}',
                    'interface Thing {',
                    '    +intersect: (ray: Ray) => Intersection',
                    '    +normal: (pos: Vector) => Vector',
                    '    +surface: Surface',
                    '    +destroy(): void',
                    '    +destroy(name: string): void',
                    '}',
                    'interface Light {',
                    '    +pos: Vector',
                    '    +color: Color',
                    '}',
                    'interface Scene {',
                    '    +things: Thing[]',
                    '    +lights: Light[]',
                    '    +camera: Camera',
                    '}',
                    'Intersection *-- Thing',
                    'Intersection *-- Ray',
                    'Thing *-- Ray',
                    'Thing *-- Intersection',
                    'Thing *-- Surface',
                    'Scene *-- Thing',
                    'Scene *-- Light',
                    '@enduml'].join(os.EOL));
    });




    it('generate PlantUML for RayTracer with compositions and only Interfaces for single file', () => {

        let files = G.sync("test/Playground/RayTracer/intersection.ts", {})

        expect(tplant.convertToPlant(tplant.generateDocumentation(files, true), { compositions: true, onlyInterfaces: true }))
            .toEqual(
                ['@startuml',
                    'interface Intersection {',
                    '    +thing: Thing',
                    '    +ray: Ray',
                    '    +dist: number',
                    '}',
                    '@enduml'].join(os.EOL));
    });

});

import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

// https://github.com/nestjs/nest/issues/1020#issuecomment-417185944
export function getParamDecoratorFactory(decorator: Function) {
  class Test {
    public test(@decorator() value: any) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

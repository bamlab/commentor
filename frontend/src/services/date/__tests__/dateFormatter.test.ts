import {
  formatDateToDDMMLined,
  formatDateToDDMMYYYLined,
  formatDateToDDMMYYYYSlash,
  FomattingFunctionType,
} from '../dateFormatter';
import mockdate from 'mockdate';

mockdate.set('2014-05-12T00:00:00.000Z');

interface IDateTestConfig extends Array<FomattingFunctionType | string> {
  0: FomattingFunctionType;
  1: string;
}

const formatDateToDDMMLinedConfig: IDateTestConfig = [formatDateToDDMMLined, '12-05'];
const formatDateToDDMMYYYLinedConfig: IDateTestConfig = [formatDateToDDMMYYYLined, '12-05-2014'];
const formatDateToDDMMYYYYSlashConfig: IDateTestConfig = [formatDateToDDMMYYYYSlash, '12/05/2014'];

describe.each([
  formatDateToDDMMLinedConfig,
  formatDateToDDMMYYYLinedConfig,
  formatDateToDDMMYYYYSlashConfig,
])('.coucou(%i)', (functionToTest, expectResultForTodayTest) => {
  test.each`
    date          | expectedString
    ${new Date()} | ${expectResultForTodayTest}
  `(
    `should format date`,

    ({ date, expectedString }) => {
      expect(functionToTest(date)).toEqual(expectedString);
    },
  );
});

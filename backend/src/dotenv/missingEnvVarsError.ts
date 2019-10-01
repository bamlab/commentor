export default class MissingEnvVarsError {
  name: string;
  missing: string[];
  example: string;
  sample: string;
  message: string;

  constructor(
    allowEmptyValues: boolean | string[],
    dotenvFilename: string,
    exampleFilename: string,
    missingVars: string[],
    error: Error,
  ) {
    const errorMessage = `The following variables were defined in ${exampleFilename} but are not present in the environment:\n  ${missingVars.join(
      ', ',
    )}
Make sure to add them to ${dotenvFilename} or directly to the environment.
If you expect any of these variables to be empty, you can use the allowEmptyValues option:
dotenv.config({
  allowEmptyValues: ['ALLOWED_HOST']
});`;
    const envErrorMessage = error
      ? `Also, the following error was thrown when trying to read variables from  ${dotenvFilename}:\n${
          error.message
        }`
      : '';
    this.name = this.constructor.name;
    this.missing = missingVars;
    this.example = this.sample = exampleFilename;
    this.message = [errorMessage, envErrorMessage].filter(Boolean).join('\n\n');
  }
}

export class OrgDoesNotExistsError extends Error {
  constructor() {
    super('The provided org does not exists.')
  }
}

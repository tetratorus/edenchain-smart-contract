export default async promise => {
  try {
    await promise;
    assert.fail('Expected revert not received');
  } catch (error) {
    console.log(error, 'errororror')
    const revertFound = error.message.search('revert') >= 0;
    assert(revertFound, `Expected "revert", got ${error} instead`);
  }
};

import { PublicClientApplicationBuilder } from "./publicClientApplicationBuilder";

test('constructor should have clientid', () => {
    const pca = PublicClientApplicationBuilder.create("1-2-3-4").Build();
    expect(pca.Config.ClientId).toEqual("1-2-3-4");
});

// test('connect and add values', async () => {
//     const pca = PublicClientApplicationBuilder.create("1-2-3-4").Build();
//     const retval = await pca.AcquireTokenWithDeviceCode();
//     expect(retval).toEqual(22);
// });

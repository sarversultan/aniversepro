import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "aniversepro",
  private_key_id: "8510915b4384e9695562b8ff70701dd1645a985f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDT81Cq8y6YuIWq\nA1ea/5bNxFy17ahXGJwRPV7dvMUoufclTOZIOEyvWtrTyseTOkWMXxY2sAh4vBUc\ng7MCmO6uMyW3oMz7GXplgnhafYSzmOJlogNspkzrkpqNzy4mFGvsBeGPHg/0595F\nnxzmQyELX9D88hY3Lq6qYLc1Z5uEh8u6ApPpv0zWdTZdJEaWp4blsOZ6hZ7/cIFw\nA+/P18AmoP4NbShoazr6CoPIO70yhBuWR9TBzYyAHOTkttIUY0rB10cGGdfpn2PR\nvRNoL4nxMH7uaGu0uonJOFeSYyyT/Y1agjJdkXBzjXqjQ8IWuUEeJe5EbhvC5mEy\nmCRtmXRJAgMBAAECggEAVflkx3NNe3WeApDIgH8c1OrKEKIOnwXEiNm0GY3xC8wj\njGXdI35y3M6l5TNkMTx56a7Ie/Z7+T2R8rcZbfxLFS56Jjp7638yPurllw9DPPbP\nHxrQ+MmcehJFzzAzMA8ol9zq2fr/zgAgEW2xc1XXmZ2MUI6CpG+zOjlxF6CnXOJb\nhqehYhcALmmG+jx/DRIOQfVl8xd6LE2iXt4GUICGWxSi/pfOgyp5ExkzR2JB+Q5+\nbBKoHxXL/MbYOIM7d0NQYZmiIaHqe1HV87qNP1oatkf3Uf1n3p8vLoSNMMlrr80i\n3UG6lE6A8ZiedsPjjd1WuurBHQ9jysHUBZ/ER7Dw4QKBgQDysn9t/VeX+I92Wc4k\niVj1EcLZ7AqcDPuuAwm3ZOFxjvKMVtmMY3ERbejKJACBhr3/JeQjF0llkf9c8B5j\n/IxZMcpMAn4yrKeVFNX4DZgFBFNNHTaHGRt/O2Oh8dtZSj8J62+XJ3K3a9ngif0L\n5UScvvVkvS6JKyLJhG4rcj9gVwKBgQDfkWGiyW0AFOMAdVIJnZcH93ySXkdr/dwl\n0FqLybsm9beNpa2ZctM3g8olzGRvkDCBuGkL3JyLNbvzqXMHJS3YyTGxLfC71k+K\n4+EqW605bGofJ6n6hnHXMPaSI0dguDW+bC2SSzfdKQtZPOwrMsG2tGFXTQCL8mJ1\nU4eiKhBsXwKBgHO9eFPl254X5aLVVR/LeGb3H2t5y917u5LS1BFnxLO5LiaLTJhM\n3CEpvziXTr52malSUqgBdPlBVPznbjbUu8HVotn43mIgQJMyKpBvOy45T9iYs+Zd\nrOVSV0Nl6et9Iu8CHmeBYo3imzcf11OS9NOjpbdzGPxFXAOqajfB9kNlAoGBAK81\nf4AVPcBfnhuA1l9EytVqho0rJ+whUoOsCxocafi5fzWaTze//no2ZZlD2r54ERvI\ni0LJjUGoRflKpiRGZezMmI4Tw+NhrIrb1l3c5R/osC5kZlk5PkR4UfTrgwfwteXb\nX8eT/V7syMER9sBQEfJ+4P6LEU+cEL+ES/qx3pcfAoGACsVkbaajj7vFOPsH9eMh\niL4z3wEKBgIhi2gXtnefy4646wxJ9JC1cpDahusTr0pe7WiUQD3r6jKROQKtmoMd\n6T1QRoscT3uuN9h3YnHFfWL2lHZpfv+zGYXrPflyUrkNfVpJCVwMWqjkkRsq47yu\n930yK4+4u2Ak0hut0Ehd9fI=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@aniversepro.iam.gserviceaccount.com",
  client_id: "113429350878141514770",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40aniversepro.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firebaseAuth = admin.auth(); 
// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:"tentalents-fdd1d",
      clientEmail: "firebase-adminsdk-fbsvc@tentalents-fdd1d.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbof/dEUTnB1Zr\n6EnwOO6yiiwGRudhshyMBFhfmq6Pi8QuVjCbvc8nnck9j8W986aL+lLHxsGNDuht\nO9S7B1XDI7ySIkuQLzyqvnPnTonrUmS73NnJodecAMaBWZrV+p47AwAjbKvEp1Wu\nuXpXbdZ8DUZtKrmQv3GTC8QGOfwPgW3waKBzD4licPb3BOrGJkEBShjDvv2bFRzx\nJ0JQ2HdnIakPWqxTAoMnkOSw16H4RJ21WLqwTNY9HGFwUA8npRFCjI9dlVSBmUAb\nithiyoTLrKhlo1pIolgGgYxxfR9ChXCxrxKUSva9JTfWvQAQaq27c+bPl+0mXpTU\nKn3N4YTPAgMBAAECggEADXhjtUDwY2/5epTRXs8JVz9UTiVxk2gfcRL93yXROVq8\nhnzZRNw/LiD0W7Vc78hDQFb7NpACYpt0DI2i0klGkqw+KbEkNHzngFPETl84MBD3\n57asIaKLZH+WBCNlnmL3B7PbyDUjV32wPH47PjlN2NDWqU41tMyNH6VjYwfpGXeq\nHsj8E0A2AetCC2wgiyWyZdND4qioNTHumzDajpwZs4fUvcv2ukBX1UOErPosyipd\n5Yz4zAkIuISs/hSVvdPOJ+IgdPIqgG7bsecmCHI8Hg+nDG6WJmu6CtG/GgQ3hOsx\nwBiD3DdUOmIQSA4owIpvI//7bd0nlfA14sfyiOxyMQKBgQDQegkU5tZL25zeFuQL\nk6dqe4kQ4BuJae0+pvmUyIQ/XoHZcYG2PgJhQUUGWKdCJgUfHx0SvZRURGR/PsZz\nPOdx7whaQ6WQelXG8D36N1PTyjqas43o9QjoEbWRb/t6mdSC9V4BRPNxhyZ22HbX\n4YMjtm8CLLdDz24kfexxTu8zZwKBgQC/HC5X3JrJn5+r1mrb1IGQ/yR33Q4PY+wU\nCR+X3RYHZhUQozdlweFk6EQrOdZc4y4lbRRFUh73g4Y/AnRcN9C+Z9ugY+io8AUN\nB7qR6oXI9P/pUOMnt45ItmPCwLqDvK6kUuxKlCTB9KWW6RKQxB2D+4Vc184q3MNJ\nCvxiLRBqWQKBgQCWAXlPZNmFM7wnwWjNO60W3VS+o8KsmV9v2U10VONzhVkBUL74\nlp23xPMZoeiXnCvLPOP6fBaim6OEO3MnsAcI3+muqUYUMzJNNsghpnXWyohokBHo\nMYf7E+MFhwH4MX/Lyymc2DQi2BBBK3g31bg6liZB9lLXpAWolELxNM7AuQKBgCCO\nz4Jebexdilk/DTNoT66BGRhmi4epsUV0jHJV0vPtuzb7Z2upjRmgzERE9TUb6ver\nTqHErMvkF1HSvDodtC1MCkmX28I0KdgfcfR77NDglFyOUDSq+819bR93sA7TbTlH\ne0P1WxHD+RXtnSEWmCStC/pWNaRtucNO4NJk9P/5AoGBAL/96d3nhePqT2I3vJzx\n2HF6RfO6GZnEw4eRomx5lqOK0vzKEAREYiw4emo57Td82Y9ja8ks5jZzSb7VZ+J/\njn/6c02qleOx8d7D39+mQhwJSQ4A9xbUWN75Z3/GhygFh9L4DpHBv1tlDngXQ08F\nuEDfNetRD3T0iV84ahfVqcER\n-----END PRIVATE KEY-----\n",
    }),
  });
}

export { admin };

import { randomUUID } from 'crypto';
import { Kafka } from 'kafkajs';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'producer-test',
    brokers: ['secure-swan-6556-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c2VjdXJlLXN3YW4tNjU1NiQpmBTcl7K9mQgGKirzVxrzoZhtnD6rcDAiz0FIG9U',
      password: '66c30a41fdbd476c842d6bc939b3a92c',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade.',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();

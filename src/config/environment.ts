export default () => ({
    amqpUri: process.env.AMQP_URI,
    queueName: process.env.QUEUE_NAME,
    jwtSecret: process.env.JWT_SECRET
})
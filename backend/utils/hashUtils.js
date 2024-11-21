import crypto from 'crypto';

const calculateHash = (log) => {
    const logData = `${log.eventType}${log.timestamp}${log.sourceAppId}${JSON.stringify(log.dataPayload)}${log.previousHash}`;

    console.log("Hashing data:", logData);

    return crypto.createHash('sha256').update(logData).digest('hex');
};


export default calculateHash;
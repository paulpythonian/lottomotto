from pymongo import MongoClient


connection = MongoClient("mongodb://hsb0104:paul371621@lottomottocluster-shard-00-00-sbmpm.mongodb.net:27017,lottomottocluster-shard-00-01-sbmpm.mongodb.net:27017,lottomottocluster-shard-00-02-sbmpm.mongodb.net:27017/test?ssl=true&replicaSet=LottoMottoCluster-shard-0&authSource=admin")
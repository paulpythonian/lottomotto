import py2neo
from py2neo import Graph, authenticate
from py2neo.ogm import GraphObject, Property, RelatedTo

def connect_graph():
    # py2neo.authenticate("hobby-efheooiekhacgbkeojanipal.dbs.graphenedb.com:24780", "lottomotto",
    #                     "b.A2ew0fdlMvLB.iEgLjfXFMieczMLp")
    # # Connect to Graph and get the instance of Graph
    # graph = py2neo.Graph("http://hobby-efheooiekhacgbkeojanipal.dbs.graphenedb.com:24780/db/data/")
    # return graph

    authenticate("hobby-dcapofbhieglgbkebnjajpal.dbs.graphenedb.com:24780", "lottomotto",
                 "b.pu6hKDTTqmuX.VKxM2zGxn5zem6rF")
    graph = Graph("bolt://hobby-dcapofbhieglgbkebnjajpal.dbs.graphenedb.com:24786", user="lottomotto",
                  password="b.pu6hKDTTqmuX.VKxM2zGxn5zem6rF", bolt=True,
                  secure=True, http_port=24789, https_port=24780)
    return graph


def add_user(graph, new_user):
    api_list = []
    print(new_user)


class Users(GraphObject):
    __primarykey__ = "id"

    id = Property()

    username = Property()
    password = Property()

    firstname = Property()
    lastname = Property()


    email = Property()

    leftChildUser= RelatedTo('Users')
    rightChildUser = RelatedTo('Users')







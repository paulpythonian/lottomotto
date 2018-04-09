

from flask import Flask, render_template, request, jsonify, redirect, session, flash
from flask import abort
from flask_cors import CORS, cross_origin
from flask import make_response, url_for
import json
import random
from time import gmtime, strftime
import bcrypt
import time
from bson.objectid import ObjectId


from flask_jsglue import JSGlue





from pymongo import MongoClient
import pymongo

connection = MongoClient("mongodb://hsb0104:Paul371621@lottomotto-shard-00-00-sbmpm.mongodb.net:27017,lottomotto-shard-00-01-sbmpm.mongodb.net:27017,lottomotto-shard-00-02-sbmpm.mongodb.net:27017/test?ssl=true&replicaSet=lottomotto-shard-0&authSource=admin")
#connection = MongoClient("mongodb://127.0.0.1:27017/db")
app = Flask(__name__)
jsglue = JSGlue(app)
app.config.from_object(__name__)
app.secret_key = 'h]0wZDv;d}oN|AR;i8;a8Cf~|,rfz`A_FqHBR5NF^m>nSMqMG/9~f+!^=.K+#>}'
CORS(app)


@app.route("/")
def index():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        api_list = []
        short_term_api_info =[]
        db = connection.lottomotto.users
        currentUser = db.find({'username': session['logged_in']})

        crypto = connection.lottomotto.shortTermCryptocurrency
        LongTermCrypto = connection.lottomotto.longTermCryptocurrency
        shortTermInfo = crypto.find().sort('updateTime', pymongo.DESCENDING).limit(15)


        for i in shortTermInfo:
            tempObject = {}
            tempObject['updateTime'] = i['updateTime']
            tempObject['market'] = i['market']
            tempObject['buy'] = i['buy']
            tempObject['stop'] = i['stop']
            tempObject['profitTarget'] = i['profitTarget']
            tempObject['recommendation'] = i['recommendation']
            short_term_api_info.append(tempObject)

        fiveStarInfo = LongTermCrypto.find({'selection': "5"})
        longTerm5 = []
        for i in fiveStarInfo:
            info = i['info']
            longTerm5.append(info)

        fiveStarInfo = LongTermCrypto.find({'selection': "4"})
        longTerm4 = []
        for i in fiveStarInfo:
            info = i['info']
            longTerm4.append(info)

        fiveStarInfo = LongTermCrypto.find({'selection': "3"})
        longTerm3 = []
        for i in fiveStarInfo:
            info = i['info']
            longTerm3.append(info)

        fiveStarInfo = LongTermCrypto.find({'selection': "2"})
        longTerm2 = []
        for i in fiveStarInfo:
            info = i['info']
            longTerm2.append(info)

        fiveStarInfo = LongTermCrypto.find({'selection': "1"})
        longTerm1 = []
        for i in fiveStarInfo:
            info = i['info']
            longTerm1.append(info)




        for i in currentUser:
            api_list.append(i)

        # if api_list != []:
        #     if api_list[0]['active']:
        #         pass
        #     else:
        #         short_term_api_info = []

        return render_template('mainpage/index.html', session= session['logged_in'], active=api_list[0]['active'], shortTerm=short_term_api_info, longTerm5 = longTerm5, longTerm4 = longTerm4, longTerm3 = longTerm3, longTerm2 = longTerm2, longTerm1 = longTerm1,   )




@app.route('/signup')
def signup():
        return render_template("pages/register.html")



@app.route('/signup/<string:sponsoridnumber>', methods=['GET', 'POST'])
def userSignup(sponsoridnumber):
    if request.method == 'POST':

        sponsorid = int(sponsoridnumber[:-1])
        sponsorside = sponsoridnumber[-1:]



        users = connection.lottomotto.users
        api_list = []
        existing_user = users.find({'$or': [{"username": request.form['username']}, {"email": request.form['email']}]})
        existing_id = users.find()
        id_list = []
        new_user_id = random.randint(1,1000000000)

        current_session = users.find({"username":session.get('logged_in')})
        current_session_api = []
        for i in current_session:
            current_session_api.append(i)

        for i in existing_id:
            id_list.append(i['id'])


        while (new_user_id in id_list):
            print("new user id exist")
            print(new_user_id)
            new_user_id = random.randint(1,1000000000)

        if( not (sponsorid in id_list)):
            print("sponsor id not exist")
            return redirect(url_for('signup'))




        for i in existing_user:
             api_list.append(str(i))
        if api_list == []:

            users.insert({
                "id": new_user_id,
                "username": request.form['username'],
                "password": bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt()),
                "firstname": request.form['firstname'],
                "lastname": request.form['lastname'],
                "email": request.form['email'],
                "phone": request.form['phone'],
                "autoship": False,
                "leftLeg": 0,
                "rightLeg": 0,
                "dateofbirth": "",
                "gender":"",
                "ssn": "",
                "nameofbank": "",
                "branchnumber": "",
                "bankaccountnumber": "",
                "address": "",
                "city":"",
                "state":"",
                'zipcode': 0,
                "enrollmentDate": time.strftime("%m/%d/%Y"),
                "rank": 0,
                "sponsorid": sponsorid,
                "active": False,
                "qualified": False,
                "leftcurrentWeekPV": 0,
                "rightcurrentWeekPV": 0,
                "left4weekpv": 0,
                "right4weekpv":0,
                "leftlegtotalpersonalcount":0,
                "rightleftotalpersonalcount":0,
                "directParent":current_session_api[0]['id'],
                "sponsortree":[],
                "pvlist": []

            })

            session.get('logged_in')
            sponsor = []
            sponsor_list = users.find({"id":sponsorid})
            for i in sponsor_list:
                sponsor.append(i)

            sponsorObject = sponsor[0]

            if sponsor != []:
                if(sponsorside == "r"):
                    sponsorObject["rightLeg"] = new_user_id
                    users.update({'username':sponsorObject['username']}, {'$set':sponsorObject})
                if(sponsorside == "l"):
                    sponsorObject["leftLeg"] = new_user_id
                    users.update({'username': sponsorObject['username']}, {'$set': sponsorObject})

            sponsorTreeObject = []
            sponsorTreeList = users.find({'username': session['logged_in']})
            for i in sponsorTreeList:
                sponsorTreeObject.append(i)

            if sponsorTreeObject != []:

                pvobject = {}
                pvobject['time'] = time.strftime("%m/%d/%Y")
                pvobject['value'] = 300

                sponsorTree = sponsorTreeObject[0]
                sponsorTree['sponsortree'].append(new_user_id)
                sponsorTree['pvlist'].append(pvobject)
                users.update({'username': session['logged_in']}, {'$set': sponsorTree})







            return render_template('pages/login.html')
        return redirect(url_for('signup'))
    else:
        if not session.get('logged_in'):
            return render_template('pages/login.html')
        else:
            current_session = session.get('logged_in')
            print(current_session)

            return render_template("pages/register.html", session=session['logged_in'], url_extention=sponsoridnumber)








# @app.route('/signup/right/<int:sponsoridnumber>', methods=['GET', 'POST'])
# def userRightSignup(sponsoridnumber):
#     if request.method == 'POST':
#         users = connection.lottomotto.users
#         api_list = []
#         existing_user = users.find({'$or': [{"username": request.form['username']}, {"email": request.form['email']}]})
#         existing_id = users.find()
#         id_list = []
#         new_user_id = random.randint(1,1000000000)
#
#         for i in existing_id:
#             id_list.append(i['id'])
#
#
#         while (not (new_user_id in id_list)):
#             print("new user id exist")
#             new_user_id = random.randint(1,1000000000)
#
#         if( not (sponsoridnumber in id_list)):
#             print("sponsor id not exist")
#             return redirect(url_for('signup'))
#
#
#
#
#         for i in existing_user:
#              api_list.append(str(i))
#         if api_list == []:
#
#             _id = users.insert({
#                 "id": new_user_id,
#                 "username": request.form['username'],
#                 "password": bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt()),
#                 "firstname": request.form['firstname'],
#                 "lastname": request.form['lastname'],
#                 "email": request.form['email'],
#                 "phone": request.form['phone'],
#                 "leftLeg": 0,
#                 "rightLeg": 0,
#                 "dateofbirth": "",
#                 "gender":"",
#                 "ssn": "",
#                 "nameofbank": "",
#                 "branchnumber": "",
#                 "bankaccountnumber": "",
#                 "address": "",
#                 "city":"",
#                 "state":"",
#                 'zipcode': 0,
#                 "enrollmentDate": time.strftime("%m/%d/%Y"),
#                 "rank": 0,
#                 "sponsorid": 0,
#                 "active": False,
#                 "qualified": False,
#                 "leftcurrentWeekPV": 0,
#                 "rightcurrentWeekPV": 0,
#                 "left4weekpv": 0,
#                 "right4weekpv":0,
#                 "leftlegtotalpersonalcount":0,
#                 "rightleftotalpersonalcount":0,
#                 "sponsortree":[]
#
#             })
#
#             session.get('logged_in')
#             sponser = []
#             sponser_list = users.find({"username":session['logged_in']})
#             for i in sponser_list:
#                 sponser.append(i)
#
#             sponserObject = sponser[0]
#
#             if sponser != []:
#                 sponserObject["leftLeg"] = new_user_id
#                 users.update({'username':session['logged_in']}, {'$set':sponserObject})
#
#
#
#             return render_template('pages/login.html')
#         return redirect(url_for('signup'))
#     else:
#         users = connection.lottomotto.users
#         existing_id = users.find()
#         id_list = []
#         print(existing_id)
#         for i in existing_id:
#             id_list.append(i['id'])
#
#         print(id_list)
#
#         if (not (934750842 in id_list)):
#             print("yes")
#
#         return render_template("pages/register.html")











@app.route('/login', methods=['POST'])
def login():
    users = connection.lottomotto.users
    api_list=[]
    login_user = list(users.find({'username': request.form['username']}))
    for i in login_user:
        api_list.append(i)


    if api_list != []:
        if api_list[0]["password"].decode('utf-8') == bcrypt.hashpw(request.form['password'].encode('utf-8'), api_list[0]['password']).decode('utf-8'):
            session['logged_in'] = api_list[0]['username']

            return redirect(url_for('index'))
        return "Invalide Username/password!"
    else: flash("Invalid Authentication")

    return 'Invalid User!'


@app.route('/logout')
def logout():
    session['logged_in'] = False
    return redirect('/')




####Tree View ########################################
@app.route('/binaryTree')
def binaryTreeView():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        return render_template('treeview/binaryTree.html', session = session['logged_in'])

@app.route('/sponsorTree')
def sponsorTreeView():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        return render_template('treeview/sponsorTree.html', session = session['logged_in'])












#Document Library ######################################
@app.route('/docs')
def documentLibrary():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        return render_template('documents/documentsLibrary.html', session= session['logged_in'])

@app.route('/rewardPlan')
def documentRewardPlan():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        return render_template('documents/rewardPlan.html', session= session['logged_in'])

@app.route('/productDetail')
def documentProductDetail():
    if not session.get('logged_in'):
        return render_template('pages/login.html')
    else:
        return render_template('documents/productDetail.html', session= session['logged_in'])




#Profile ################################################
@app.route('/profile')
def profile():
    # if not session.get('logged_in'):
    #     return render_template('pages/login.html')
    # else:
    #     return render_template('profile/profileManagement.html', session=session['logged_in'])

    if request.method =="GET":
        users = connection.lottomotto.users
        user = []
        print('id: ' + session['logged_in'])
        existing_user = users.find({"username":session['logged_in']})
        for i in existing_user:
            user.append(i)
        return render_template('profile/profileManagement.html', session=['logged_in'],  firstname=user[0]['firstname'],
                               lastname=user[0]['lastname'], email=user[0]['email'], phone=user[0]['phone'],
                               address=user[0]['address'], gender=user[0]['gender'], ssn=user[0]['ssn'], zipcode=user[0]['zipcode'],
                               nameofbank=user[0]['nameofbank'], branchnumber=user[0]['branchnumber'], bankaccountnumber=user[0]['bankaccountnumber'])













#######DEF functions########


###################################################
###################################################
###################################################
###################################################
###################Binary Tree View################


def userInfoFind(user_id):
    api_list = []
    current_user = []

    legArray = []

    leg = []



    leftnewUserCounter = 1
    rightnewUserCounter = 2

    newEdgeObject = {}

    node = []
    edge = []
    rank = ['Team Member', 'One Star', 'Two Star', 'Three Start', 'Elite', 'Global Elite', 'None']

    idcounter = 0



    currentUserDB = connection.lottomotto.users
    for i in currentUserDB.find({'username': user_id}):
        current_user.append(i)

    a = {}
    a['id'] = current_user[0]['id']
    a['label'] = current_user[0]['username']
    a['rank'] = rank[current_user[0]['rank']]
    a['next_rank'] = rank[current_user[0]['rank'] + 1]
    a['sponsorid'] = current_user[0]['directParent']
    a['enrolementDate'] = current_user[0]['enrollmentDate']

    a['group'] = 'users'
    if (current_user[0]['active']):
        a['active'] = "Yes"
    else:
        a['active'] = "No"

    if (current_user[0]['qualified']):
        a['qualified'] = "Yes"
    else:
        a['qualified'] = "No"

    organization = {}
    organization['id'] = 0
    organization['label'] = 'Lotto Motto'
    organization['group'] = 'organization'
    organization['chosen'] = 'colorShadow'

    node.append(organization)

    orgEdge = {}
    orgEdge['from'] = organization['id']
    orgEdge['to'] = a['id']

    edge.append(orgEdge)

    node.append(a)

    if(current_user[0]['leftLeg'] != 0):
        legArray.append(current_user[0]['leftLeg'])
    else:
        leftnewNodeObject = {}
        leftnewNodeObject['label'] = 'Add User'
        leftnewNodeObject['group'] = 'newUsers'
        leftnewNodeObject['sponsorid'] = current_user[0]['id']
        leftnewNodeObject['id'] = 1
        leftnewNodeObject['left'] = True
        leftnewNodeObject['right'] = False
        legArray.append(leftnewNodeObject)

    print(current_user[0]['rightLeg'])


    if(current_user[0]['rightLeg'] != 0):
        legArray.append(current_user[0]['rightLeg'])
    else:
        rightnewNodeObject = {}
        rightnewNodeObject['label'] = 'Add User'
        rightnewNodeObject['group'] = 'newUsers'
        rightnewNodeObject['sponsorid'] = current_user[0]['id']
        rightnewNodeObject['id'] = random.randint(1,10000000000000)
        rightnewNodeObject['right'] = True
        rightnewNodeObject['left'] = False
        legArray.append(rightnewNodeObject)


    db = connection.lottomotto.users
    for i in db.find():
        api_list.append(i)


    while legArray != []:
        print(legArray)
        print("")
        if type(legArray[0]) == dict:
            print(legArray[0])
            tempNode = {}
            tempNode['id'] = legArray[0]['id']
            tempNode['label'] = legArray[0]['label']
            tempNode['group'] = legArray[0]['group']
            tempNode['left'] = legArray[0]['left']
            tempNode['right'] = legArray[0]['right']
            tempNode['sponsorid'] = legArray[0]['sponsorid']

            node.append(tempNode)
            tempEdge = {}
            tempEdge['from'] = legArray[0]['sponsorid']
            tempEdge['to'] = legArray[0]['id']
            edge.append(tempEdge)

            del legArray[0]

        else:
            for i in api_list:
                if (i['id'] == legArray[0]):
                    tempNode = {}
                    tempNode['id'] = i['id']
                    tempNode['label'] = i['username']
                    tempNode['rank'] = rank[i['rank']]
                    tempNode['nextrank'] = rank[i['rank'] + 1 ]
                    tempNode['sponsorid'] = i['directParent']
                    tempNode['enrolementDate'] = i['enrollmentDate']
                    tempNode['group'] = 'users'
                    if i['active']:
                        tempNode['active'] = "Yes"
                    else:
                        tempNode['active'] = 'No'
                    if i['qualified']:
                        tempNode['qualified'] = 'Yes'
                    else:
                        tempNode['qualified'] = 'No'

                    node.append(tempNode)
                    tempEdge ={}
                    tempEdge['from'] = i['sponsorid']
                    tempEdge['to'] = tempNode['id']
                    edge.append(tempEdge)

                    if (i['leftLeg'] != 0):
                        legArray.append(i['leftLeg'])
                    else:
                        tempObject = {}
                        tempObject['id'] = random.randint(1,1000000000)
                        tempObject['label'] = 'Add User'
                        tempObject['group'] = 'newUsers'
                        tempObject['left'] = True
                        tempObject['right'] = False
                        tempObject['sponsorid'] = i['id']

                        legArray.append(tempObject)


                    if(i['rightLeg'] != 0):
                        legArray.append(i['rightLeg'])
                    else:
                        tempObject = {}
                        tempObject['id'] = random.randint(1, 1000000000)
                        tempObject['label'] = 'Add User'
                        tempObject['group'] = 'newUsers'
                        tempObject['left'] = False
                        tempObject['right'] = True
                        tempObject['sponsorid'] = i['id']

                        legArray.append(tempObject)


                    del legArray[0]
                    print('break')
                    break





    return jsonify({"node": node, "edge": edge})








###################################################
###################################################
###################################################
###################################################
###########Sponsor Tree View return ###############

def usersponsorInfoFind(user_id):
    api_list = []
    current_user = []

    sponsorLegArray = []


    node = []
    edge = []
    rank = ['Team Member', 'One Star', 'Two Star', 'Three Start', 'Elite', 'Global Elite', 'None']


    currentUserDB = connection.lottomotto.users
    for i in currentUserDB.find({'username': user_id}):
        current_user.append(i)

    a = {}
    a['id'] = current_user[0]['id']
    a['label'] = current_user[0]['username']
    a['rank'] = rank[current_user[0]['rank']]
    a['next_rank'] = rank[current_user[0]['rank'] + 1]
    a['sponsorid'] = current_user[0]['sponsorid']
    a['group'] = 'users'
    if (current_user[0]['active']):
        a['active'] = "Yes"
    else:
        a['active'] = "No"

    if (current_user[0]['qualified']):
        a['qualified'] = "Yes"
    else:
        a['qualified'] = "No"

    organization = {}
    organization['id'] = 0
    organization['label'] = 'Lotto Motto'
    organization['group'] = 'organization'
    organization['chosen'] = 'colorShadow'

    node.append(organization)

    orgEdge = {}
    orgEdge['from'] = organization['id']
    orgEdge['to'] = a['id']

    edge.append(orgEdge)

    node.append(a)


    db = connection.lottomotto.users
    for i in db.find():
        api_list.append(i)

    if(current_user[0]['sponsortree'] != []):
        sponsorLegArray = sponsorLegArray + current_user[0]['sponsortree']

        while sponsorLegArray != []:
            for i in api_list:
                if(i['id'] == sponsorLegArray[0]):
                    tempNode = {}
                    tempNode['id'] = i['id']
                    tempNode['label'] = i['username']
                    tempNode['rank'] = rank[i['rank']]
                    tempNode['nextrank'] = rank[i['rank'] + 1]
                    tempNode['sponsorid'] = i['directParent']
                    tempNode['group'] = 'users'
                    if i['active']:
                        tempNode['active'] = "Yes"
                    else:
                        a['active'] = 'No'
                    if i['qualified']:
                        tempNode['qualified'] = 'Yes'
                    else:
                        tempNode['qualified'] = 'No'

                    node.append(tempNode)

                    tempEdge = {}
                    tempEdge['from'] = i['directParent']
                    tempEdge['to'] = tempNode['id']

                    edge.append(tempEdge)

                    if (i['sponsortree'] != []):
                        sponsorLegArray += i['sponsortree']

                    del sponsorLegArray[0]
                    break






        return jsonify({"node": node, "edge": edge})




########API########################
#######DEF#########################

@app.route('/api/v1/users/<string:user_id>', methods=['GET'])
def get_userInfo(user_id):
    return userInfoFind(user_id)


@app.route('/api/v2/users/<string:user_id>', methods=['GET'])
def get_user_sponsorTree_info(user_id):
    return usersponsorInfoFind(user_id)














# Error handling
@app.errorhandler(404)
def resource_not_found(error):
    return make_response(jsonify({'error': 'Resource not found!'}), 404)


@app.errorhandler(409)
def user_found(error):
    return make_response(jsonify({'error': 'Conflict! Record exist'}), 409)


@app.errorhandler(400)
def invalid_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
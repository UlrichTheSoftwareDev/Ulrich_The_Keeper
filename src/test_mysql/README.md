##############
#16/11/2020
##############

Ici ce trouve les tests que j'ai fait avec mysql.

Dans l'init database/table il y a tout ce qui faut pour init mysql database.

Dans l'html c'est un template pour faire avec le html, attention il faut utiliser un button et non un submit sinon ça bug a cause du formulaire

dans database function tout ce qui est en commentaire c'est ce qui fonctionne avec mysql

je suis passé a sqlite3 car mysql c'est chiant car pas portable.
et de base j'avais des prob avec sqlite3 (electronjs sqlite napi create reference error) mais j'ai reussi a resoudre en mettant des button et non des submit dans html
et en faisant des db.close bourrin dans le code sinon j'ai des pages blanche quand mon programme require 2 fois sqlite3
bug chelou j'arrive pas a regler proprement.

Miantenant avec les button mysql fonctionne parfaitemeent mais c'est pas dans l'use case.

//PROB MYSQL RESOLU EN METTANT DES BUTTON A LA PLACE SUBMIT DANS LE HTML
//insert user in database from register.html : string, string
//je n'arrive pas a rentrer dans le else de la query meme si c'est ok au niveau de la bdd
//je nai donc pas le alert(registration validate)
//parcontre si je provoque une error je vais avoir le alter(eroor) et que ensuite je fais un test ok je vais avoir le alert(registration validate)
//je dois recharger la page 2 fois avec ctrl R pour que tout fonctionne sinon marche pas et ça marche qu'au bout de 3 fois

# **ARTICLE DATABASE DESIGN**
<br>

## **USER**
<img src="./img/TABLE_USER.png" width="561" height="129" />

* **PK : id**

<br/><br/>

## **ARTICLE**
<img src="./img/TABLE_ARTICLE.png" width="584" height="99" />

* **PK : id**
* **FK : ARTICLE(author)  &#8594;  USER(id)**<br/>

<br/><br/>

## **LIKE**
<img src="./img/TABLE_LIKE.png" width="308" height="185" />

* **PK : id**
* **FK** <br/>
    **1. LIKE(user_id)  &#8594;  USER(id)**<br/>
    **2. LIKE(article_id)  &#8594;  ARTICLE(id)**

<br/><br/>

## **COMMENT**
<img src="./img/TABLE_COMMENT.png" width="502" height="155" />

* **PK : id**
* **FK** <br/>
    **1. COMMENT(article_id)  &#8594;  ARTICLE(id)**<br/>
    **2. COMMENT(user_id)  &#8594;  USER(id)**
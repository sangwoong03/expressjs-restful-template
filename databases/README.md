## ✅ Databases

관계형 데이터베이스 (RDBMS, Relational Databases Management System)에서는 데이터가 여러 개의 2차원 테이블에 저장되고 관리됩니다.

웹 서비스에서 필요한 데이터를 데이터베이스 시스템에 저장하기 위해 `정규화`된 테이블을 구축하게 됩니다.

이런 과정을 `스키마 (Schema) 설계`를 한다고 일컫습니다.

스키마 설계 과정을 거친 후 실제 물리적인 서버에는 API나 Query문을 통해 데이터베이스 객체를 작성, 삭제, 관리하게 됩니다.

<br>

### 📌 Database Object

`데이터베이스 객체`는 데이터베이스 내에 정의하는 모든 것을 가리킵니다.

데이터베이스 내부에서 실체를 가지는 대상을 가리키는데요,  
다양한 __`종류`__ 중 3가지에 대해 간단하게 알아보겠습니다. 

1. `2차원 테이블 (Table)`
    - 행(가로, row, record)과 열(세로, column, field)로 구성된 데이터 
    집합입니다.
    - 실제 데이터를 저장하는 공간입니다.
2. `뷰 (View)` 
    - 데이터베이스에 존재하는 일종의 가상 테이블입니다.
    - 실제 데이터를 저장하는 공간이 아닌, 데이터를 보여주기만 합니다.
3. `인덱스 (Index)`
    - 데이터베이스 테이블의 검색, 수정, 삭제 속도를 향상시키기 위한 자료구조입니다.
    - 데이터베이스의 저장공간을 사용하여 전반적인 시스템 부하를 줄일 수 있습니다.

외에도 다양한 종류가 있으며,  
데이터베이스 객체의 종류에 따라 저장되는 데이터도 달라집니다.

<br>

데이터베이스 객체의 **`명명 규칙`** 은 다음과 같습니다.

- 기존 이름이나 예약어와 중복되면 안됩니다.

- 숫자로 시작할 수 없습니다.

- 언더스코어(`_`) 이외의 기호는 사용할 수 없습니다.

- 한글을 사용할 때는 더블쿼트(MySQL에서는 백쿼트)로 감싸야합니다.

- 시스템이 허용하는 길이를 초과하지 않는다.

- 객체가 담고 있는 정보를 명학하게 표현할 수 있는 이름을 선택합니다.

<br>
<br>

### 📌 Schema (스키마)

우리는 앞에서 `스키마 설계`라는 단어를 접했는데요.

먼저 스키마란 `데이터베이스의 구조와 제약 조건에 관한 전번적인 명세를 기술한 것`을 가리킵니다.

구조는 다음 세가지를 포함합니다.

1. `속성 (Attribute)`: 개체의 특성을 나타납니다.

2. `개체 (Entity)`: 속성들의 집합으로 이루어져있습니다.

3. `관계 (Relationship)`: 개체 사이의 관계를 나타냅니다.

<br> 

위에서 알아본 데이터베이스 객체는 `스키마 (Schema)`라는 컨테이너에 만들어집니다.

`MySQL`에 접속하면 기본적으로 볼 수 있는 스키마가 있습니다.

다음 명령어를 입력해주세요.

```
mysql> show databases;
```

`information_schema` 나 `performance_schema`가 그것인데요.

`MySQL` 서버 관리를 위해 필요한 테이블, 뷰, 인덱스 등 데이터베이스 객체를 담고 있습니다.

테이블은 열 (filed)을 정의하여 담을 수 있고,  
스키마틑 이 테이블을 담을 수 있는 하나의 컨테이너가 되는 것입니다.

<br>
<br>

### 📌SQL Statements

스키마를 생성하기 앞서 쿼리문에 대해 알아보겠습니다.

__1. DDL__

`Data Define Language`의 약자로 스키마 내부의 객체를 `정의`하고 `관리`할 때 사용하는 쿼리문입니다.

대표적은 DDL은 다음과 같습니다.

- `CREATE` : 데이터베이스, 테이블을 생성 
- `ALTER` : 테이블 수정
- `DROP` : 데이터베이스, 테이블을 삭제
- `TRUNCATE` : 테이블을 초기화
- `RENAME` : 테이블 이름 변경 / 테이블 이동

__2. DML__

`Data Manipulate Language`의 약자로 스키마 내부의 데이터를 삭제하거나 수정하는 등 테이블에 있는 행과 열을 `조작`할 때 사용하는 쿼리문입니다.

대표적인 DML은 다음과 같습니다.

- `INSERT` : 데이터 삽입
- `UPDATE` : 데이터 수정
- `DELETE` : 데이터 삭제
- `MERGE` : 테이블 병합
- `LOCK TABLE` : 테이블 잠금 (쿼리문 실행 안됨.)

__3. DQL__

`Data Query Language`의 약자로 데이터를 검색하는 쿼리문입니다.

대표적인 DQL은 `SELECT`입니다.

__4. TCL__

`Transaction Control Language`의 약자로 DCL에서 트랜잭션을 제어하는 명령인 쿼리문을 분리하여 표현합니다.

데이터의 일관성을 유지하면서 안정적으로 데이터를 복구시키기 위해 사용합니다.

대표적인 TCL 문은 다음과 같습니다.

- `COMMIT` : 변경된 내용 영구 저장.
- `ROLLBACK` : 변경되기 이전 상태로 되돌림.
- `SAVEPOINT` : 특정 위치까지를 영구 저장 (저장점 지정)
- `SET TRANSACTION` : 트랜잭션 속성 설정 명령어.

<br>
<br>

## ✅ 쿼리문 예시

### 1. 테이블 생성

테이블 생성 쿼리문은 다음과 같습니다.

`users` 라는 테이블에 id와 name 필드를 갖는 테이블을 생성해보겠습니다.

```sql
mysql> CREATE TABLE users
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
```

생성된 테이블을 확인하는 쿼리문은 다음과 같습니다.

``` sql
mysql> desc users;
+---------------+---------------+------+-----+-------------------+-----------------------------+
| Field         | Type          | Null | Key | Default           | Extra                       |
+---------------+---------------+------+-----+-------------------+-----------------------------+
| id            | int           | NO   | PRI | NULL              | auto_increment              |
| name          | varchar(50)   | NO   |     | NULL              |                             
+---------------+---------------+------+-----+-------------------+-----------------------------+
```

<br>

### 1.1 테이블 열 추가

테이블 생성 후 열(column) 추가 쿼리문은 다음과 같습니다.

```sql
mysql> ALTER TABLE users ADD age INT NOT NULL;
```

변경된 테이블을 확인해보면 다음과 같습니다.

``` sql
mysql> desc users;
+---------------+---------------+------+-----+-------------------+-----------------------------+
| Field         | Type          | Null | Key | Default           | Extra                       |
+---------------+---------------+------+-----+-------------------+-----------------------------+
| id            | int           | NO   | PRI | NULL              | auto_increment              |
| name          | varchar(50)   | NO   |     | NULL              |                             |
| age           | int           | NO   |     | NULL              |                             |
+---------------+---------------+------+-----+-------------------+-----------------------------+
```

만약 기존에 존재하는 데이터가 있는 경우 추가된 age 열의 기본 값은 모두 `NULL` 값이 됩니다.

`NULL` 이외의 값이 아닌 다른 값으로 추가하기 위해서는 NOT NULL 제약 후 기본 값을 지정해주어야 합니다.

예시)

```sql
mysql>   ALTER TABLE users ADD age INT NOT NULL DEFAULT 0;
```

<br>

### 1.2 테이블 열 삭제 / 수정

테이블의 열을 삭제하는 쿼리문은 다음과 같습니다.

`ALTER` 쿼리문을 사용할 때는 `DROP` 키워드를 통해 삭제하고 싶은 열을 지정해줄 수 있습니다.

```sql
mysql> ALTER TABLE users DROP age;
```

열을 수정하고 싶으면, `MODIFY` 키워드를 통해 수정하려는 열을 지정할 수 있습니다.

```sql
mysql> ALTER TABLE users MODIFY name user_name varchar(30) NOT NULL;
```
<br>

### 1.3 테이블 모든 행 삭제

`DELETE` 쿼리문을 통해서는 삭제해야되는 데이터가 많으면 처리 속도가 늦어집니다.

이럴 때 `TRUNCATE` 쿼리문을 사용할 수 있습니다.

```sql
mysql> TRUNCATE TABLE users;
```

<br>

### 2. 데이터 추가

테이블의 데이터를 추가하는 쿼리문은 다음과 같습니다.

기본적으로 많이 사용되는 `INSERT INTO(생략가능) {table_name} {(column_name1, ...column_nameN)} VALUES {(data1, ..., dataN)}` 쿼리문입니다.

```sql
mysql> INSERT INTO users (name, age) VALUES ("sangwoong", 27);
```

<br>

### 2-1. 데이터 수정

테이블의 데이터를 수정하는 쿼리문은 다음과 같습니다.

기본적으로 많이 사용되는 `UPDATE {table_name} SET {data} WHERE {condition}` 쿼리문입니다.

```sql
mysql> UPDATE users SET age=28 WHERE id=1;
```

<br>

### 2-2. 데이터 삭제

테이블의 데이터를 삭제하는 쿼리문은 다음과 같습니다.

`DELETE` 쿼리문을 사용하여 데이터를 삭제할 수 있습니다.

```sql
mysql> DELETE FROM users WHERE id=1;
```

<br>

### 3. 데이터 검색

테이블을 생성하고 데이터를 추가했다면, 이제 그 데이터를 꺼내서 확인해야 하는 단계가 필요합니다.

`SELECT` 쿼리문을 통해 테이블에 저장된 데이터를 확인할 수 있습니다.

와일드카드 `*` 을 사용하면, 지정한 테이블의 모든 데이터를 확인할 수 있습니다.

```sql
mysql> SELECT * from users;
```

<br>

### 3.1 특정 열 검색

특정 `열 (column)`을 확인하고 싶다면, 다음과 같이 쿼리문을 작성할 수 있습니다.

여러개의 `열 (column)`은 `, (comma)`로 구분할 수 있습니다.

```sql
mysql> SELECT name, age FROM users;
```

<br>

### 3.2 특정 조건 검색

데이터가 가진 조건에 따라 데이터 검색 결과를 얻을 수 있습니다.

우선 예시 쿼리문부터 확인해보겠습니다.

```sql
mysql> SELECT name, age FROM users WHERE name LIKE "김%" AND age > 20;
```

`users` 테이블에서 데이터를 가져오는 쿼리문입니다.

`name`과 `age`에 대한 정보를 가져올텐데요.

조건문에는 `name`의 데이터가 `김`으로 시작하는 문자열이며,  
`age`의 데이터는 20 이상의 숫자에 해당하는 데이터를 반환할 것입니다.

좀 더 자세한 설명은 https://www.w3schools.com/sql/default.asp에서 확인할 수 있습니다.

<br>
<br>

## Advanced SQL

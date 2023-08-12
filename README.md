# Simple REST API Server for Financial Tracker Application

## Intro

A simple REST API Server for Financial Tracking Application, so user can input their assets and get the list of it. This REST API Server is using Node js, TypeScript, and Express that allows users to perform basic CRUD (Creat, Read, Update, Delete) operations on application.

## Content

* Intro
* Content
* Tools
* Get Started
* The Installed Package for the Project
* Configuring package.json
* Create app.ts
* Create routes.ts
* Try the API
* Deploy Server on Fly.io

## Tools

1. Git and Github
2. Google Chrome
3. VS Code
4. REST Client Tools(Postman, Thunder Client(VS Code Extension))
5. Node Js
6. TypeScript
7. Express

## Get Started

Before we start to build the server, first you need to downlaod and install [Node.Js](https://nodejs.org/en), choose the latest LTS version of it.

After that, you can start to create your project folder, then open Command Prompt, and type `npm init` to initialization npm on project. It will create new file "package.json". You can skip to fill it for now. Next, you can start to install package for your project.

## The Installed Package for the Project
1. `npm install -g typescript` for install typescript for global,
`npm install -D typescript` and `npm install -D  @types/node` for install typescript for Developer,  next you can use `tsc -v` to check the installation version.
Installing modules locally allows you to control and share the versions through package.json. ts-node will always resolve the compiler from cwd before checking relative to its own installation.

2. `npm install express dotenv` for install express js(minimalist web framework for Node.js) and dotenv(storing configuration in the environment separate from code).
3. `npm install -D @types/express` (This package contains type definitions for Express).
4. `npm install body-parser` and `npm install -D @types/body-parser` (Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.) 
5. `npm i -D concurrently` for run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.
6. `npm i -D nodemon` for install nodemon, that is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Configuring package.json
Custom script for building, start, and run the server.
```json
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/app.js",
    "watch": "concurrently \"npx tsc --watch\" \"nodemon -q dist/app.js\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
## Create app.ts
This file is for HTTP method(request and response) handlers, to make it connect to server using certain port.
```typescript
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 1111;

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`The Server is now run on http://localhost:${port}`);
});
```

## Create routes.ts
This file is for design and implement HTTP method request handlers, that allows users to perform basic CRUD (Create, Read, Update, Delete) operations on transactions.

1. Declaration interface for variable data name atributes and it types
```typescript
interface Financial {
    id: number;
    type: string;
    finance: string;
    detail: string;
    cash: number;
}

let financial: Financial[] = [
    { id: 1, type: 'Cash In', finance: 'Gajian', detail: 'Gajian Bulanan', cash: 4000000 },
    { id: 2, type: 'Cash Out', finance: 'Belanja', detail: 'Belanja Kebutuhan Bulanan', cash: 500000 },
    { id: 3, type: 'Cash Out', finance: 'Bayar Listrik', detail: 'Bayar Listrik Bulanan', cash: 250000 },
];
```
2. GET all is to show all existing data method
```typescript
router.get('/financial', (req: Request, res: Response) => {
    res.json(financial);
});
```

3. GET by id is to show existing data by id
```typescript
router.get('/financial/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const financials = financial.find((p) => p.id === id);
    if (financials) {
        res.json(financials);
    } else {
        res.status(404).json({ message: 'Financial is Not Found' });
    }
});
```

4. POST is to create new data
```typescript
router.post('/financial', (req: Request, res: Response) => {
    const newFinancial: Financial = {
        id: financial.length + 1,
        type: req.body.type,
        finance: req.body.finance,
        detail: req.body.detail,
        cash: req.body.cash,
    };
    financial.push(newFinancial);
    res.status(201).json(newFinancial);
});
```

5. PUT by id is to update existing data by id
```typescript
router.put('/financial/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const updatedFinancial: Financial = {
            id,
            type: req.body.type,
            finance: req.body.finance,
            detail: req.body.detail,
            cash: req.body.cash,
        };
        financial[financialIndex] = updatedFinancial;
        res.json(updatedFinancial);
    } else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
```

6. PATCH by id is to partilally update existing data by id
```typescript
router.patch('/financial/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const updatedFinancial: Financial = {
            ...financial[financialIndex],
            ...req.body,
        };
        financial[financialIndex] = updatedFinancial;
        res.json(updatedFinancial);
    } else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
```

7. DELETE by id is to delete an existing data by id
```typescript
router.delete('/financial/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const deletedFinancial = financial.splice(financialIndex, 1)[0];
        res.json(deletedFinancial);
    } else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
```
## Try the API
Before that, make sure we have already build/compile the project and turn on the server using `tsc --watch` on terminal.

We will need to try the API using REST client tool, to ensure that it is functioning properly. On this case we will install and use either "Postman" application or anoter application, there are alternative extension app on VS Code, and that is "Thunder Client", which is more lightweight from Postman. In here we will use "Thunder Client".

1. GET /financial : Returns a list of all post

![1 thunder-client-GET-ALL-Financial](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/de4a43aa-0988-456f-adca-5f85f63daba1)

2. GET /financial/:id : Return a spesific post with the given ID

![2 thunder-client-GET-Financial-by-id](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/60efbbbd-54e2-400e-97c5-7f6ea15a3f2d)

3. POST /financial : Create a new post

![3 thunder-client-POST-New-Financial-by-id](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/62d57f6f-4cf0-4a62-bc72-ef76914dee24)

4. PUT /financial/:id : Updates an existing post with the given ID

![5 thunder-client-PUT-ALL-Financial-atribute-by-id](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/7e86185e-146e-421d-ae8f-e3dd2a6741a5)

5. PATCH /financial/:id : Partially update an existing post with the given ID

![4 thunder-client-PATCH-1-Financial-atribute-by-id](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/030e63a2-4034-43e5-98e2-28d42909f453)

6. DELETE /financial/:id : Deletes an existing post with the given ID

![6 thunder-client-DELETE-Financial-by-id](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/e36fb251-2b21-4a45-8edc-4e613130a5dc)

## Deploy Server on Fly.io
We can deploy our server using deployment platform, on this case we are going to using fly.io platform.
![1-fly io-website](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/d922d90d-3be0-4ebf-9b6a-ad7d9dae07d1)

Hostname :

https://be-suryaftr97.fly.dev
![4-fly io-success-deploy](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/8e08c0a8-f7aa-4d9b-bc56-98dfa2b58d44)


Hostname for transaction :

https://be-suryaftr97.fly.dev/api/financial
![5-fly io-api-transaction](https://github.com/RevoU-FSSE-2/week-8-SuryaFtr/assets/127850712/b7f4e418-5084-44f4-b1e3-1a5f80b1c121)


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/sRKW9Tsr)
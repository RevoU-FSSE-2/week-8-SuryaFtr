import express, { Request, Response } from 'express';

const router = express.Router();

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

router.get('/financial', (req: Request, res: Response) => {
    res.json(financial);
});

router.get('/financial/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const financials = financial.find((p) => p.id === id);
    if (financials) {
        res.json(financials);
    } else {
        res.status(404).json({ message: 'Financial is Not Found' });
    }
});

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

export default router;
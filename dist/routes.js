"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let financial = [
    { id: 1, type: 'Cash In', finance: 'Gajian', detail: 'Gajian Bulanan', cash: 4000000 },
    { id: 2, type: 'Cash Out', finance: 'Belanja', detail: 'Belanja Kebutuhan Bulanan', cash: 500000 },
    { id: 3, type: 'Cash Out', finance: 'Bayar Listrik', detail: 'Bayar Listrik Bulanan', cash: 250000 },
];
router.get('/financial', (req, res) => {
    res.json(financial);
});
router.get('/financial/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const financials = financial.find((p) => p.id === id);
    if (financials) {
        res.json(financials);
    }
    else {
        res.status(404).json({ message: 'Financial is Not Found' });
    }
});
router.post('/financial', (req, res) => {
    const newFinancial = {
        id: financial.length + 1,
        type: req.body.type,
        finance: req.body.finance,
        detail: req.body.detail,
        cash: req.body.cash,
    };
    financial.push(newFinancial);
    res.status(201).json(newFinancial);
});
router.put('/financial/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const updatedFinancial = {
            id,
            type: req.body.type,
            finance: req.body.finance,
            detail: req.body.detail,
            cash: req.body.cash,
        };
        financial[financialIndex] = updatedFinancial;
        res.json(updatedFinancial);
    }
    else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
router.patch('/financial/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const updatedFinancial = Object.assign(Object.assign({}, financial[financialIndex]), req.body);
        financial[financialIndex] = updatedFinancial;
        res.json(updatedFinancial);
    }
    else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
router.delete('/financial/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const financialIndex = financial.findIndex((p) => p.id === id);
    if (financialIndex !== -1) {
        const deletedFinancial = financial.splice(financialIndex, 1)[0];
        res.json(deletedFinancial);
    }
    else {
        res.status(404).json({ message: 'Financial  is Not Found' });
    }
});
exports.default = router;

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from typing import List
import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas
class ExpenseCreate(BaseModel):
    amount: float
    description: str
    category: str
    date: date

class ExpenseResponse(BaseModel):
    id: int
    amount: float
    description: str
    category: str
    date: date

    class Config:
        from_attributes = True

# Routes
@app.get("/")
def read_root():
    return {"status": "Expense Tracker API running", "message": "Use /docs for API documentation"}

@app.post("/expenses/", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/", response_model=List[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).order_by(models.Expense.date.desc()).all()
    return expenses

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}

@app.get("/expenses/summary")
def get_summary(db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).all()
    total = sum(expense.amount for expense in expenses)
    
    categories = {}
    for expense in expenses:
        if expense.category in categories:
            categories[expense.category] += expense.amount
        else:
            categories[expense.category] = expense.amount
    
    return {
        "total": total,
        "by_category": categories,
        "count": len(expenses)
    }
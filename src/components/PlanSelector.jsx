// src/components/PlanSelector.jsx
import React from 'react';
import { Users, Check } from 'lucide-react';

const PlanSelector = ({ plans, selectedPlan, onPlanSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Select Plan</h3>
      
      <div className="grid gap-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onPlanSelect(plan)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPlan?.id === plan.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {selectedPlan?.id === plan.id && (
                  <Check className="h-5 w-5 text-blue-600 mr-3" />
                )}
                <div>
                  <h4 className="font-medium text-gray-800">{plan.name}</h4>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Up to {plan.maxPersons} persons</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">₹{plan.price}</p>
                <p className="text-xs text-gray-500">per group</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;

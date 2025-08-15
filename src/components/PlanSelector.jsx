import React from 'react';
import { Check, Users, Star } from 'lucide-react';

const PlanSelector = ({ plans, selectedPlan, onPlanSelect }) => {
  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-playfair text-lg font-semibold text-secondary-800 mb-4">
        Choose Your Plan
      </h4>
      
      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onPlanSelect(plan)}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selectedPlan?.id === plan.id
                ? 'border-primary-400 bg-primary-50 shadow-elegant'
                : 'border-primary-200 bg-white hover:border-primary-300 hover:bg-primary-25 shadow-warm'
            }`}
          >
            {/* Selection Indicator */}
            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              selectedPlan?.id === plan.id
                ? 'border-primary-500 bg-primary-500'
                : 'border-secondary-300'
            }`}>
              {selectedPlan?.id === plan.id && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>

            <div className="pr-8">
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-playfair text-lg font-bold text-secondary-800">
                  {plan.name}
                </h5>
                <div className="text-right">
                  <span className="font-playfair text-xl font-bold text-primary-600">
                    ₹{plan.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-2">
                {plan.description && (
                  <p className="font-poppins text-sm text-secondary-600">
                    {plan.description}
                  </p>
                )}
                
                {plan.maxPersons && (
                  <div className="flex items-center text-secondary-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="font-poppins text-sm">
                      Max {plan.maxPersons} {plan.maxPersons === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                )}

                {/* Additional plan features if any */}
                {plan.features && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-peach/20 text-accent-peach text-xs rounded-full font-poppins"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Badge for highest priced plan */}
            {plan.price === Math.max(...plans.map(p => p.price)) && plans.length > 1 && (
              <div className="absolute -top-2 left-4">
                <div className="bg-elegant-gradient text-white px-3 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span className="text-xs font-medium">Most Popular</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Plan Benefits Note */}
      <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-3 mt-4">
        <p className="font-poppins text-xs text-secondary-600 text-center">
          All plans include basic amenities. Select the plan that best fits your group size.
        </p>
      </div>
    </div>
  );
};

export default PlanSelector;


export function computeNutritionValue(age, gender, height, currentWeight, goalWeight, goalTimeFrame) {
  // Calculate the nutrition value required
  

  //Calculate bmr ratio (we can print this also)
  let bmr = 0;

  if (gender === "MALE") {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
  }

  let caloriesRequired = Math.round(bmr * 1.2);
  //goal-based calories
  if(goalWeight && goalTimeFrame) {
    const weightDifference = goalWeight - currentWeight;


    const totalCaloriesToChange = weightDifference * 7700;
    const totalDays = goalTimeFrame * 30;
    const dailyCaloriesAdjustment = Math.round(totalCaloriesToChange / totalDays);

    //daily req calories (gain or loose)
    caloriesRequired += dailyCaloriesAdjustment;
  }

  const fiberRequired = Math.round((caloriesRequired / 1000) * 14);

  const carbsCal = caloriesRequired * 0.5;
  const proteinCal = caloriesRequired * 0.2;
  const fatCal = caloriesRequired * 0.3;

  const carbohydratesRequired = Math.round(carbsCal / 4);
  const proteinsRequired = Math.round(proteinCal / 4);    
  const fatsRequired = Math.round(fatCal / 9);

  return {
    caloriesRequired,
    carbohydratesRequired,
    proteinsRequired,
    fatsRequired,
    fiberRequired
  }
}


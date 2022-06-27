import React ,{useState,useEffect}from "react";
import Select from "react-select";

const FoodItem = ({ addFoodItem,food }) => {
	const mapToOpttions = food.alt_measures.map(item => ({ value: item.serving_weight, label: item.measure}) );
		// {serving_weight: 107, measure: 'slice', seq: 1, qty: 1}
		// to =>  { value: 1, label: "1" },
	const [Grams, setGrams] = useState(
    mapToOpttions[0].value / food.serving_weight_grams
  );
	const [AltMeasure,setAltMeasure] = useState(mapToOpttions[0].value);
	const [Option, setOption] = useState(mapToOpttions[0]);

	useEffect(() => {
    setOption(mapToOpttions[0]);
  }, [food, mapToOpttions]);

	
  return (
    <div className='exercise-grid bg-light'>
      <img src={food.photo.thumb} alt='' className='round-img' />
      <div>
        <h2 className='food-title'>
          {food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1)}
        </h2>
        <Select
          value={Option}
          isMulti={false}
          onChange={(item) => {
            setOption(item);
            setAltMeasure(item.value);
            setGrams(item.value / food.serving_weight_grams);
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#e0c6c1",
              text: "#3599B8",
              font: "#3599B8",
            },
          })}
          options={mapToOpttions}
          required
        />
        <p className='food-target-muscle'>
          Serving weight:
          {AltMeasure}grams
        </p>
        <p className='food-target-muscle'>
          Calories:{Math.round(Grams * food.nf_calories)}
        </p>
        <p className='food-target-muscle'>
          Cholesterol:{Math.round(Grams * food.nf_cholesterol)}
        </p>
        <p className='food-target-muscle'>
          Fiber:{Math.round(Grams * food.nf_dietary_fiber)}
        </p>
        <p className='food-target-muscle'>
          Potassium:{Math.round(Grams * food.nf_potassium)}
        </p>
        <p className='food-target-muscle'>
          Protien:{Math.round(food.nf_protein * Grams)}
        </p>
        <p className='food-target-muscle'>
          Saturated Fat:{Math.round(food.nf_saturated_fat * Grams)}
        </p>
        <p className='food-target-muscle'>
          Sodium:{Math.round(food.nf_sodium * Grams)}
        </p>
        <p className='food-target-muscle'>
          Sugars:{Math.round(food.nf_sugars * Grams)}
        </p>
        <p className='food-target-muscle'>
          Carbohydrate:{Math.round(food.nf_total_carbohydrate * Grams)}
        </p>
        <p className='food-target-muscle'>
          Fat:{Math.round(food.nf_total_fat * Grams)}
        </p>
      </div>

      <button
        className='btn btn-primary'
        onClick={() => addFoodItem(food, AltMeasure)}
      >
        Add
      </button>
    </div>
  );
};




export default FoodItem;

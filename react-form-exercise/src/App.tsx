import { useState, type ChangeEvent } from "react"

const App = () => {
  type FormData = {
    firstname: string,
    lastname: string,
    age: number,
    favoriteFoods: string[]
  }

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    age: 0,
    favoriteFoods: []
  })
  const [output, setOutput] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((current) => {
      const updatedFavFoods = checked
      ? [...current.favoriteFoods, value]
      : current.favoriteFoods.filter((f) => f !== value)
      return {
        ...current,
        favoriteFoods: updatedFavFoods
      }
    })
  }

  const handleDisplay = () => {
    if(
      !formData.firstname.trim() || !formData.lastname.trim() || formData.age === 0
    ) {
      console.log('Missing details')
      return
    }
    console.log(formData)
    setOutput(`Hello ${formData.firstname} ${formData.lastname}. You are ${formData.age} years old and your favorite foods are: ${formData.favoriteFoods.join(', ')}.`)
  }

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      age: 0,
      favoriteFoods: []
    })
    setOutput('')
  }

  return (
    <div>
      <h1>User Form</h1>
      <form>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Favorite Foods:</label>
          <div>
            <input type="checkbox" id="chicken" name="favoriteFoods" value="Chicken" checked={formData.favoriteFoods.includes('Chicken')} onChange={handleCheckChange} />
            <label htmlFor="chicken">Chicken</label>
          </div>
          <div>
            <input type="checkbox" id="beef" name="favoriteFoods" value="Beef" checked={formData.favoriteFoods.includes('Beef')} onChange={handleCheckChange} />
            <label htmlFor="beef">Beef</label>
          </div>
          <div>
            <input type="checkbox" id="vegetables" name="favoriteFoods" value="Vegetables" checked={formData.favoriteFoods.includes('Vegetables')} onChange={handleCheckChange} />
            <label htmlFor="vegetables">Vegetables</label>
          </div>
          <div>
            <input type="checkbox" id="dessert" name="favoriteFoods" value="Dessert" checked={formData.favoriteFoods.includes('Dessert')} onChange={handleCheckChange} />
            <label htmlFor="dessert">Dessert</label>
          </div>
          <div>
            <input type="checkbox" id="pork" name="favoriteFoods" value="Pork" checked={formData.favoriteFoods.includes('Pork')} onChange={handleCheckChange} />
            <label htmlFor="pork">Pork</label>
          </div>
        </div>
      </form>
      <button type="button" onClick={handleDisplay}>Display User</button>
      <button type="button" onClick={handleReset}>Clear</button>

      <div className="output">{output}</div>
    </div>
  );
};

export default App;
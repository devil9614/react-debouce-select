# DebounceSelect

DebounceSelect is a React library that provides an input box with a dynamic dropdown menu populated with data retrieved from a specified API endpoint. The input box is debounced, ensuring that API requests are only made after the user has stopped typing for a specified time. This helps reduce the number of API calls, improving the performance and user experience of your application.

## Features

- Debounced input box to limit API requests
- Dynamic dropdown menu populated with data from a specified API endpoint
- Customizable input field placeholder, option label, and option value
- Built-in loading indicator and 'no result found' message
- Supports click outside to close the dropdown

## Installation

To install DebounceSelect, run the following command:

```bash
npm install debounce-select-library
```

## Usage 

Here's a basic example of how to use the DebounceSelect component in your application

```
import React from 'react';
import DebounceSelect from 'debounce-select-library';

const App = () => {
  const handleInputChange = (selectedValue) => {
    console.log('Selected Value:', selectedValue);
  };

  const apiFunc = async (searchText) => {
    // Replace this with your actual API call.
    const response = await fetch(`https://api.example.com/search?query=${searchText}`);
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>DebounceSelect Example</h1>
      <DebounceSelect
        onchange={handleInputChange}
        apiFunc={apiFunc}
        placeholder="Search for items"
        optionkey="name"
        optionValue="id"
      />
    </div>
  );
};

export default App;
```

## Api

| Prop          | Type       | Default        | Description                                                                                                   |
|---------------|------------|----------------|---------------------------------------------------------------------------------------------------------------|
| onchange      | Function   |                | A function to be called when the selected input value changes.                                                |
| apiFunc       | Function   |                | The API function to call when an input value is selected.                                                     |
| url_prefix    | string     | 'deb_select'   | The prefix for the API endpoint URL.                                                                          |
| placeholder   | string     |                | The placeholder text to display in the input select field.                                                     |
| optionkey     | string     |                | The key in the API response JSON object to be used as the option label.                                       |
| optionValue   | string     |                | The key in the API response JSON object to be used as the option value.                                       |


## Contributing

Contributions are welcome! Please read the contributing guide to learn how you can get involved and help improve DebounceSelect.

## License

DebounceSelect is released under the [MIT License](https://opensource.org/license/mit/).

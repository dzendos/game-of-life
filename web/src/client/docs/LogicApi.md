# GameOfLifeApi.LogicApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**nextGen**](LogicApi.md#nextGen) | **POST** /evaluateNextGeneration | Evaluates next generation



## nextGen

> [MapInner] nextGen(mapInner)

Evaluates next generation

By given map evaluates next generation in game of life.

### Example

```javascript
import GameOfLifeApi from 'game_of_life_api';

let apiInstance = new GameOfLifeApi.LogicApi();
let mapInner = [new GameOfLifeApi.MapInner()]; // [MapInner] | Evaluate next generation
apiInstance.nextGen(mapInner, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mapInner** | [**[MapInner]**](MapInner.md)| Evaluate next generation | 

### Return type

[**[MapInner]**](MapInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


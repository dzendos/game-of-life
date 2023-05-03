# GameOfLifeApi.ConfigurationApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**setReplicasNumberPut**](ConfigurationApi.md#setReplicasNumberPut) | **PUT** /setReplicasNumber | Changes number of replicas



## setReplicasNumberPut

> setReplicasNumberPut(body)

Changes number of replicas

By the given number from 1 to 100, sets the given number of replicas on the server.

### Example

```javascript
import GameOfLifeApi from 'game_of_life_api';

let apiInstance = new GameOfLifeApi.ConfigurationApi();
let body = 56; // Number | Asks to change the number of replicas
apiInstance.setReplicasNumberPut(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Number**| Asks to change the number of replicas | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


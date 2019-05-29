Implemented methods:

**CORE**

- GetInstance  
- ListInstances  
- InstanceAction
- ListVnicAttachments
- GetVnic
- ListImages

**IAM**

- ListCompartments
- ListAvailabilityDomains


## Test

To test the API, create a `test/data/testData.json` file populated with the following content:

```json
{
    "client": {
        "userID": "ocid1.user.oc1..xxx...",
        "fingerprint": "66:7yyy...",
        "tenantID": "ocid1.tenaxxx...",
        "zone": "eu-frankfurt-1",
        "key": "-----BEGIN RSA PRIVATE KEY-----..."
    },
    "testInstance": {
        "compartmentId": "ocid1.compartment.oc1..qqq...",
        "instanceId": "ocid1.instance.oc1.eu-frankfurt-1.www...",
        "vnicId": "ocid1.vnic.oc1.eu-frankfurt-1.eee..."
    }
}
```

Note that tests for POST APIs are skipped by default.

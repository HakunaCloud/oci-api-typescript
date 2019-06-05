import { Client } from '../../src'
import * as chaiMiddleware from 'chai-as-promised'
import * as chai from 'chai'
import { LaunchInstanceDetails } from '../../src/models';

const config = require('../data/testData.json')

chai.use(chaiMiddleware)
const expect = chai.expect

const client = new Client(config.client);

const testCompartmentId = config.testInstance.compartmentId
const testInstanceId = config.testInstance.instanceId
const testVnicId = config.testInstance.vnicId

const metadata = {
    "ssh_authorized_keys": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDKojfMpsvCAl5/GxIVnLX1Ply+ht+7nsn/Uy0ediPKthtcT5dNZTDXPGlKT9LY2QGuSGHV2kfLVIXtdjjCffpEmyWwdKh9h5I26Ez79a43L9LLwgTaAumbUfmMQs+f2C5QwK5xF1itzPNy4lx+qIshepRsWrAYA9eNO4sg+fLOaN6OG/q2gm9sS4vPAQ+eglmXOmdyk1qThT94e71frwLlPPoy0Kue7cFr7HaABd+il64klWCpcncWn2qbas8N6u1Msa2CkyOGoYznJ6mddT1fGVHa+5izVpLEsWO52GbISH8jf+DPmKEGuf67D9UzxC6GpFrZcc2DJcAgH9iGvxD9 carloloffredo@tarlobook.local",
    "user_data": "I2Nsb3VkLWNvbmZpZwpyZXBvX3VwZGF0ZTogdHJ1ZQpyZXBvX3VwZ3JhZGU6IGFsbAoKcnVuY21kOgogLSBbIHNoLCAtYywgInJwbSAtVXZoIGh0dHA6Ly9ycG1zLmZhbWlsbGVjb2xsZXQuY29tL2VudGVycHJpc2UvcmVtaS1yZWxlYXNlLTcucnBtIiBdCiAtIFsgc2gsIC1jLCAieXVtIC0tZW5hYmxlcmVwbz1yZW1pLHJlbWktcGhwNzEgaW5zdGFsbCBodHRwZCBwaHAgcGhwLWNvbW1vbiAteSIgXQogLSBbIHNoLCAtYywgInl1bSAtLWVuYWJsZXJlcG89cmVtaSxyZW1pLXBocDcxIGluc3RhbGwgcGhwLWNsaSBwaHAtcGVhciBwaHAtcGRvIHBocC1teXNxbG5kIHBocC1nZCBwaHAtbWJzdHJpbmcgcGhwLW1jcnlwdCBwaHAteG1sIC15IiBdCiAtIHN5c3RlbWN0bCBzdGFydCBodHRwZC5zZXJ2aWNlCiAtIHN5c3RlbWN0bCBlbmFibGUgaHR0cGQuc2VydmljZQogLSBbIHNoLCAtYywgImlwdGFibGVzIC1JIElOUFVUIC1wIHRjcCAtLWRwb3J0IDgwIC1qIEFDQ0VQVCIgXQogLSBbIHNoLCAtYywgImlwdGFibGVzIC1JIElOUFVUIC1wIHRjcCAtLWRwb3J0IDQ0MyAtaiBBQ0NFUFQiIF0KIC0gWyBzaCwgLWMsICJzZXJ2aWNlIGlwdGFibGVzIHNhdmUiIF0KIC0gWyBzaCwgLWMsICJta2RpciAvdmFyL3d3dy9odG1sL3VwbG9hZHMiIF0KIC0gWyBzaCwgLWMsICJ3Z2V0IGh0dHBzOi8vb3JhY2xlLWRlbW8uczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vaW5kZXguaHRtbCIgXQogLSBbIHNoLCAtYywgIndnZXQgaHR0cHM6Ly9vcmFjbGUtZGVtby5zMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9vcmFjbGVMb2dvLnBuZyIgXQogLSBbIHNoLCAtYywgIndnZXQgaHR0cHM6Ly9vcmFjbGUtZGVtby5zMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS91cGxvYWQucGhwIiBdCiAtIFsgc2gsIC1jLCAiY2F0IGluZGV4Lmh0bWwgPiAvdmFyL3d3dy9odG1sL2luZGV4Lmh0bWwiIF0KIC0gWyBzaCwgLWMsICJjYXQgb3JhY2xlTG9nby5wbmcgPiAvdmFyL3d3dy9odG1sL3VwbG9hZHMvb3JhY2xlTG9nby5wbmciIF0KIC0gWyBzaCwgLWMsICJjYXQgdXBsb2FkLnBocCA+IC92YXIvd3d3L2h0bWwvdXBsb2FkLnBocCIgXQogLSBbIHNoLCAtYywgImNob3duIC1SIGFwYWNoZTphcGFjaGUgL3Zhci93d3cvaHRtbC91cGxvYWRzIiBd"
}

describe('Core', () => {
    it('should get the instance', async () => {
        const instance = await client.Core.GetInstance(testInstanceId)
        expect(instance.id).to.not.equal('')
    });
    it('should list instances', async () => {
        const instances = await client.Core.ListInstances(testCompartmentId)
        expect(instances.length).to.not.equal(0)
    })
    it('should list instances with an unexisting name', async () => {
        const instances = await client.Core.ListInstances(testCompartmentId, {
            displayName: 'wish.i.existed.tho'
        })
        expect(instances.length).to.equal(0)
    })
    it.skip('should stop an instance', async () => {
        const response = await client.Core.InstanceAction(testInstanceId, 'SOFTSTOP')
    })
    it.skip('should start an instance', async () => {
        const response = await client.Core.InstanceAction(testInstanceId, 'START')
    })
    it('should list VNIC attachments for the compartment without specifying instance', async () => {
        const response = await client.Core.ListVnicAttachments(testCompartmentId)
        expect(response.length).to.equal(0)
    })
    it('should list VNIC attachments for the specific instance', async () => {
        const response = await client.Core.ListVnicAttachments(testCompartmentId, testInstanceId)
        expect(response.length).not.to.equal(0)
    })
    it('should get a VNIC attachment', async () => {
        const response = await client.Core.GetVnic(testVnicId)
        expect(response.publicIp).to.not.equal('')
    })
    it('should get a list of images', async () => {
        const response = await client.Core.ListImages(testCompartmentId, 'CentOS', '7')
        console.log(response[0])
    })
    it('should get a list of vcns', async () => {
        const response = await client.Core.ListVcns(testCompartmentId)
        console.log(response[0])
    })
    it('should get a list of subnets', async () => {
        const vcns = await client.Core.ListVcns(testCompartmentId)
        const response = await client.Core.ListSubnets(vcns[0].id, testCompartmentId)
        console.log(response[0])
    })
    it('should launch an instance', function () {
        this.timeout(10*1000);
        return client.IAM.ListAvailabilityDomains(testCompartmentId)
        .then(res => {
            console.log(res);
            const testLaunch: any = {'availabilityDomain': res[0].name!, 'compartmentId': testCompartmentId, 'shape': 'VM.Standard2.1', 'subnetId': 'ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaadd7cerr43z4ul6dr2lshwwd5km2j7ry5mxglalotptr3z6z2dgkq', 'imageId': 'ocid1.image.oc1.eu-frankfurt-1.aaaaaaaap4e7y2fyzyx57bfxg6rs5zbnbepfmvcjkezfnhnb4tjo77hl2cma'};
            return client.Core.LaunchInstance(testLaunch);
        })
        .catch(err => {
            console.log(err);
        })
    })
    it('should create a custom image', function () {
        this.timeout(10*1000);
        return client.Core.CreateImage({'compartmentId': testCompartmentId, 'imageSourceDetails': {'sourceType': 'objectStorageUri', 'sourceUri': 'https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/fqlrwClqDWnm0_3dMIDuoBCyzZfr5CHNIBVKnCW9ufM/n/friymuqg9lsz/b/images/o/hakuna-demo-image'}})
    })
    it('should launch a Hakuna Demo instance', function () {
        this.timeout(1000*60*2);
        return client.IAM.ListAvailabilityDomains(testCompartmentId)
        .then(res => {
            console.log(res);
            const testLaunch: any = {'availabilityDomain': res[0].name!, 'compartmentId': testCompartmentId, 'shape': 'VM.Standard2.1', 'subnetId': 'ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaadd7cerr43z4ul6dr2lshwwd5km2j7ry5mxglalotptr3z6z2dgkq', 'imageId': 'ocid1.image.oc1.eu-frankfurt-1.aaaaaaaap4e7y2fyzyx57bfxg6rs5zbnbepfmvcjkezfnhnb4tjo77hl2cma', metadata};
            return client.Core.LaunchInstance(testLaunch);
        })
        .catch(err => {
            console.log(err);
        })
    }) 

})

describe('IAM', () => {
    it('should list compartments', async () => {
        const response = await client.IAM.ListCompartments()
        expect(response.length).to.not.equal(0)
    })
    it('should list availability domains', async () => {
        const response = await client.IAM.ListAvailabilityDomains(testCompartmentId)
        console.log(response)
        expect(response.length).to.not.equal(0)
    })
})

describe('Errors', () => {
    it('should return an error', done => {
        client.Core.GetInstance('i.do.not.exist').then(done).catch(err => {
            expect(err.code).to.equal('NotAuthorizedOrNotFound')
        }).then(done).catch(done)
    })
})

describe.skip('Util', function () {
    this.timeout(120 * 1000)
    it('should wait for the instance to be started', async () => {
        await client.Core.InstanceAction(testInstanceId, 'START');
        await client.util.waitForInstanceState(testInstanceId, 'RUNNING')
        // Just wait some time before issueing a new command
        await (() => new Promise(r => setTimeout(r, 5000)))()
    })
    it('should wait for the instance to be stopped', async () => {
        await client.Core.InstanceAction(testInstanceId, 'SOFTSTOP');
        await client.util.waitForInstanceState(testInstanceId, 'STOPPED')
    })
})

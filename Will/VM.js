"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");
const { secret } = require("@pulumi/pulumi");

// Create a network and subnet for all VMs.
const network = new azure.network.VirtualNetwork("server-network", {
    resourceGroupName: "will-DEV-lin-prd-rg",
    addressSpaces: ["10.0.0.0/16"],
    subnets: [{
        name: "default",
        addressPrefix: "10.0.1.0/24",
    }],
});

const networkInterface = new azure.network.NetworkInterface("server-nic", {
    resourceGroupName: "will-DEV-lin-prd-rg",
    ipConfigurations: [{
        name: "webserveripcfg",
        subnetId: network.subnets[0].id,
        privateIpAddressAllocation: "Dynamic",
    }],
});

const vm = new azure.compute.VirtualMachine("Will-Dev-vm", {
    resourceGroupName: "will-DEV-lin-prd-rg",
    networkInterfaceIds: [networkInterface.id],
    vmSize: "Standard_A0",
    deleteDataDisksOnTermination: true,
    deleteOsDiskOnTermination: true,
    osProfile: {
        computerName: "DevWill",
        adminUsername: "will",
        adminPassword: "147258",
        
    },
    osProfileLinuxConfig: {
        disablePasswordAuthentication: false,
    },
    storageOsDisk: {
        createOption: "FromImage",
        name: "myosdisk1",
    },
    storageImageReference: {
        publisher: "canonical",
        offer: "UbuntuServer",
        sku: "16.04-LTS",
        version: "latest",
    },
    
});

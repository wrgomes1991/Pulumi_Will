"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");

const VM = require("./Will/VM")




// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup("will-DEV-lin-prd-rg");


// Create an Azure resource (Storage Account)
const account = new azure.storage.Account("ststdWillDev", {
    // The location for the storage account will be derived automatically from the resource group.
    resourceGroupName: resourceGroup.name,
    accountTier: "Standard",
    accountReplicationType: "LRS",
});

// Export the connection string for the storage account
exports.connectionString = account.primaryConnectionString;

# Clean-Campaign-Name

This is a custom script that is used to process events in order to clean and transform the utm_campaign property of the event.

The script exports a single function, `processEvent(event, { config })`, which takes in two arguments:

    event: the event object that needs to be processed
    config: an object containing any configuration options that may be required by the script


The `processEvent()` function first checks if the event object has a utm_campaign property, and if it does, it passes the value of this property to the `cleanUtmCampain(utmCampaign)` function. 


The `cleanUtmCampain(utmCampaign)` function performs the following operations on the input utmCampaign:

- Replaces all occurrences of com- with comp-
- Replaces all occurrences of compp- with comp-
- Splits the input utmCampaign by the _ character, and keeps only the first part
- Splits the resulting string by the - character, and keeps only the first two parts
- Joins the resulting array of strings with a (space) character

The cleaned and transformed utm_campaign value is then assigned to the campaign property of the event object's $set property, and also assigned to the initial_campaign property of the event object's $set_once property.

Finally, the processed event object is returned by the `processEvent()` function, to be ingested by the system that called it.

The script is likely used to clean up and standardize the utm_campaign property of events before they are ingested into a data pipeline or analytics platform.
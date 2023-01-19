// Processes each event, optionally transforming it

const cleanUtmCampain = (utmCampaign) => {

    return utmCampaign.replace('com-', 'comp-').replace('compp-', 'comp-').split('_')[0].split('-').slice(0, 2).join(' ')
}

export function processEvent(event, { config }) {
    // Some events (such as $identify) don't have properties
    if (event.properties['utm_campaign']) {
        const cleanCampaign = cleanUtmCampain(event.properties['utm_campaign'])
        if (event.properties['$set']) {
            event.properties['$set']['campaign'] = cleanCampaign
        } else {
            event.properties['$set'] = { 'campaign': cleanCampaign }
        }
        if (event.properties['$set_once']) {
            event.properties['$set_once']['initial_campaign'] = cleanCampaign
        } else {
            event.properties['$set_once'] = { 'initial_campaign': cleanCampaign }
        }
    }
    // Return the event to be ingested, or return null to discard
    return event
}
import path from 'path';
import fs from 'fs';

function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json')
}

function extractData(filePath){
    const jsonData = fs.readFileSync(filePath)
    const data = JSON.parse(jsonData)
    return data;
}


export default function handler (req, res){
    const {method} = req;

    // Access our data 
        //404 if there are no AllEvents
    // extract data 
    // AllEvents - loop through and identify eventId 
    // add the email to emails_registered - write function 
    // only if email doesn't already exist in database, check if format of email is okay
    const filePath = buildPath()
    const {events_categories, allEvents} = extractData(filePath)

    if(!allEvents) {
        return res.status(404).json(
            {
                status: 404,
                message: 'Events data not found'
            }
        )
    }

    if(method === "POST"){
        const { email, eventId } = req.body;
        if(!email | !email.includes('@')){
            res.status(422).json(
                {
                    message: "Invalid email address"
                }
            )
            return
        }
        const newAllEvents = allEvents.map(ev => {
            if(ev.id === eventId){
                if(ev.emails_registered.includes(email)) {
                
                    res.status(409).json(
                        {
                            message: "This email has already been registered"
                        }
                    )
                    return ev
                }
                return {
                    ...ev, emails_registered:[...ev.emails_registered, email]
                }

            }
            return ev
        })

        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }))

        res.status(200).json({message: `You have been registered successfully with email: ${email} ${eventId}`})
    }

}
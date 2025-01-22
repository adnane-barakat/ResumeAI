const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



async function main() {
    const additionalskills = await getjobinterndescription(resume);
    // Print the completion returned by the LLM.
    console.log(additionalskills.choices[0]?.message?.content || "");
}

async function getAdditionalSkills(resumeText) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `You are a resume suggester and you are asked to give additional skills to learn for someone with the following resume, bearing in mind that you must only give skills and technologies that are very related to the field they want. If you do not have any other suggestions, say that the resume doesn't lack any additional skills. You are to give the example as if directly talking to the owner of the resume and only provide the suggestions without phrases of formality. This is the resume: ${resumeText}`,
            },
        ],
        model: "llama3-8b-8192",
    });
}


async function getjobinterndescription(resumetext) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `You are a resume suggester and you are asked to give a suggestion on how the resume describes the jobs , itnernships and projects descriptions only do not talk about any other part only those three   considering the most succesfull resumes and reviews you can find in the internet.If the jobs or internships descriptions are good just say that you dont need any further changes or dont mention it at all . If you have suggestion on a description write the suggestions you provide and then rewrite the whole description with the right changes and with respecting the previous description If a sections doesnt have aheading it means they are informations about the owner so dont talk about it .You must not ask questions only suggestions .You are only asked to give suggestions on projects jobs and interships  only do not talk about any other part  . you are to give the example as if directly you are talking to the owner of the resume and only the suggestions without phrases of formality.The order suggestions are  not to be talked about  .This is the resume : ${resumetext}` +
                     +
                    "",
            },
        ],
        model: "llama3-8b-8192",
    });
}


module.exports = {
    getjobinterndescription,
    getAdditionalSkills,
};
<script>
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { getStorage, ref, uploadBytes } from 'firebase/storage';
    import { Button } from 'flowbite-svelte';
    import { ReportStore } from '../../stores/ReportStore.js';

    let spamChecked = false;
    let abuseChecked = false;
    let otherChecked = false;
    let otherReason = "";
    let additionalInfo = "";
    let imageFile;
    let submissionStatus = ""; 
    let userUID;
    let reportData = [];

    ReportStore.subscribe(data => {
        reportData = data;
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });

    const handleReasonChange = (event) => {
        const { id, checked } = event.target;
        if (id === "spam") {
            spamChecked = checked;
        } else if (id === "abuse") {
            abuseChecked = checked;
        } else if (id === "other") {
            otherChecked = checked;
            toggleOtherReasonInput();
        }
    };

    const handleOtherReasonChange = (event) => {
        otherReason = event.target.value.slice(0, 200); 
    };

    const handleAdditionalInfoChange = (event) => {
        additionalInfo = event.target.value.slice(0, 2000);
    };

    const handleImageUpload = (event) => {
        imageFile = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `reports/${userUID}/${imageFile.name}`);
        
        const metadata = {
            contentType: imageFile.type
        }

        const uploadTask = uploadBytes(storageRef, imageFile, metadata);  
    };

    const toggleOtherReasonInput = () => {
        const otherReasonInput = document.getElementById("otherReason");
        if (otherReasonInput) {
            otherReasonInput.style.display = otherChecked ? "block" : "none";
        }
    };

    const handleSubmit = () => {
        let reasonsProvided = [];
        if (spamChecked) reasonsProvided.push("Spam");
        if (abuseChecked) reasonsProvided.push("Abuse");
        if (otherChecked) reasonsProvided.push("Other");

        console.log("[Reasons Provided:", reasonsProvided.join(", "), "]");

        if (otherChecked) {
            console.log("[Other:", otherReason, "]");
        }

        console.log("[Additional Information:", additionalInfo, "]");

        if (imageFile) {
            console.log("[Image Info]");
            console.log("File Name:", imageFile.name);
            console.log("File Size:", imageFile.size, "bytes");
            console.log("File Type:", imageFile.type);
            console.log("[More Image Info]");
            console.log("File Name:", imageFile);
        } else {
            console.log("[No Image Attached]");
        }

        const data = {
            userUID: userUID,
            offenderName: reportData[1],
            messages:  reportData[2],
            reason: reasonsProvided.join(", "),
            explanation: otherReason || additionalInfo
        };

        sendDataToFlask(data);

        async function sendDataToFlask(data) {
            try {
                const response = await fetch('http://localhost:5000/add_report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                console.log(responseData);
                submissionStatus = "success";
                setTimeout(() => goto('/chat'), 2000);
            } catch (error) {
                console.error('Error:', error);
                submissionStatus = "error"; 
            }
        }
    }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 class="text-3xl font-semibold mb-6">Report {reportData[1]}</h1>

        {#if submissionStatus === "success"} 
            <p class="text-green-500">Report successfully submitted!</p>
        {:else}
            <form on:submit|preventDefault={handleSubmit}>
                <label for="reasons">Reasons to Report:</label>
                <input
                    type="checkbox"
                    id="spam"
                    name="reason"
                    value="spam"
                    on:change={handleReasonChange}
                />
                <label for="spam">Spam</label>
                <input
                    type="checkbox"
                    id="abuse"
                    name="reason"
                    value="abuse"
                    on:change={handleReasonChange}
                />
                <label for="abuse">Abuse</label>
                <input
                    type="checkbox"
                    id="other"
                    name="reason"
                    value="other"
                    on:change={handleReasonChange}
                />
                <label for="other">Other</label>
                <input 
                    type="text"
                    id="otherReason"
                    class="other-reason"
                    bind:value={otherReason}
                    placeholder="Specify other reason..."
                    on:input={handleOtherReasonChange}
                />

                <label for="additionalInfo">Additional Information:</label>
                <textarea
                    id="additionalInfo"
                    bind:value={additionalInfo}
                    placeholder="Enter additional details..."
                    on:input={handleAdditionalInfoChange}
                ></textarea>
                <div id="charCount" class="char-count">{2000 - additionalInfo.length} characters left</div>

                <label for="image" >Attach Image:</label>
                <input
                    type="file"
                    id="image"
                    on:change={handleImageUpload}
                    accept="image/*"
                />

                <div id="submit-btn"><Button type="submit" class="bg-blue-600 hover:opacity-75 hover:bg-blue-600">Send Report</Button></div>
            </form>
        {/if}
    </section>
</main>

<style>
    main{
        margin-top: 100px;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }
    input[type="checkbox"] {
        margin-right: 10px;
    }
    textarea {
        width: 100%;
        height: 100px;
        resize: vertical;
    }
    #submit-btn {
        display: block;
        margin-top: 20px; 
        margin-bottom: 0px;
        text-align: center; 
    }
    .other-reason {
        display: none;
        margin-bottom: 8px;
    }
    .char-count {
        font-size: 0.8em;
        color: gray;
        margin-top: 5px;
    }
</style>

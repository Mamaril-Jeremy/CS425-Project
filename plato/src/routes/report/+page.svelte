<script>
    let spamChecked = false;
    let abuseChecked = false;
    let otherChecked = false;
    let otherReason = "";
    let additionalInfo = "";
    let imageFile;

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
        otherReason = event.target.value.slice(0, 200); // Limit to 200 characters
    };

    const handleAdditionalInfoChange = (event) => {
        additionalInfo = event.target.value.slice(0, 2000); // Limit to 2000 characters
    };

    const handleImageUpload = (event) => {
        imageFile = event.target.files[0];
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

        // Sending data to server here
        const data = {
            userReason: reasonsProvided.join(", "),
            userExplanation: otherReason || additionalInfo,
        };

        sendDataToFlask(data);

        async function sendDataToFlask(data) {
            try {
                const response = await fetch(
                    'http://localhost:5000/add_report', //Match with your localhost to work
                    {
                        method: "POST",
                        body: JSON.stringify(data),
                    },
                );

                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        // ---------------------------
    };
</script>

<body id="outside-container" class="bg-gray-100">
    <div class="container">
        <h1>User Report</h1>
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

            <label for="image">Attach Image:</label>
            <input
                type="file"
                id="image"
                on:change={handleImageUpload}
                accept="image/*"
            />

            <button type="submit" class="submit-btn">Send Report</button>
        </form>
    </div>

    <script>
        const toggleOtherReasonInput = () => {
            const otherReasonInput = document.getElementById("otherReason");
            if (otherReasonInput) {
                otherReasonInput.style.display = otherChecked
                    ? "block"
                    : "none";
            }
        };

        const otherCheckbox = document.getElementById("other");
        const otherChecked = otherCheckbox.checked;

        otherCheckbox.addEventListener("change", function () {
            toggleOtherReasonInput();
        });
    </script>
</body>

<style>
    #outside-container {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: white;
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
    .submit-btn {
        margin-top: 20px;
    }
    .other-reason {
        display: none;
    }
    .char-count {
        font-size: 0.8em;
        color: gray;
        margin-top: 5px;
    }
</style>

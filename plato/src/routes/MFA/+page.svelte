<script>
    import { authHandlers } from "../../stores/authStore.js"
    import { Label, Input, GradientButton } from 'flowbite-svelte';
    import { RecaptchaVerifier } from "firebase/auth";

    let phoneNumber;

    async function handleSubmit() {
      if(!phoneNumber)
      {
        return
      }

      if(phoneNumber) {
        try {
          await authHandlers.updatePassword(newPassword);
          goto('/home')
        } catch (err) {
          console.log(err)
        }
      }
    }

    const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
            "size": "normal",
            "callback": function(response) {
                // reCAPTCHA solved, you can proceed with
                // phoneAuthProvider.verifyPhoneNumber(...).
                onSolvedRecaptcha();
            },
            "expired-callback": function() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth
    );
</script>

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-6">
            <Label for="phoneNumber" class="mb-2">Phone number</Label>
            <Input type="phoneNumber" id="phoneNumber" placeholder="123-456-7890" required bind:value={phoneNumber} />
        </div>
        <div class="centered-button"><GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
        </div>
    </form>
</div>
  
  
  <style>
      .form-container {
        position: relative;
        margin-top: 75px;
      }
  
      .centered-button{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
      }
  </style>
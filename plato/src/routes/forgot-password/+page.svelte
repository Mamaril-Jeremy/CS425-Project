<script>
    // This code was developed by Mark Marsala
    import { Label, Input, Button } from 'flowbite-svelte';
    import { authHandlers } from "../../stores/authStore.js"
    import { goto } from '$app/navigation';

    let formData = {
        resetEmail: '',
    };
    let showConfirmationDialog = false;

    async function handleSubmit() {
        const { resetEmail } = formData;

        if (!resetEmail) {
        return;
        }

        try {
        await authHandlers.forgotPasswordReset(resetEmail);
        showConfirmationDialog = true;
        } catch (err) {
        console.log(err);
        }
    }

    function handleConfirmation(confirm) {
        showConfirmationDialog = false;
        if (confirm) {
            goto('/sign-in');
        }
    }
    </script>

    <body>
    <div class="title">Password Reset</div>
    <div class="form-container">
        <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input type="email" id="email" placeholder="first.last@company.com" required bind:value={formData.resetEmail} />
        </div>
        <div class="centered-button">
            <Button type="submit" color="blue">Submit</Button>
        </div>
        </form>
    </div>
    {#if showConfirmationDialog}
    <div class="confirmation-dialog">
      <p>Please check your email for a password reset link</p>
      <button on:click={() => handleConfirmation(true)}>Ok</button>
    </div>
    {/if}
</body>

<style>
    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }

    .title {
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 60px;
    }

    .form-container {
        text-align: center;
        width: 50%;
    }

    .centered-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
    }

    .confirmation-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    }
</style>
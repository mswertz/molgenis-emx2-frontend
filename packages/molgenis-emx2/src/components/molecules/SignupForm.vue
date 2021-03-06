<template>
  <Spinner v-if="loading" />
  <div v-else-if="success">
    <MessageSuccess>{{ success }}</MessageSuccess>
    <ButtonAlt @click="cancel">Close</ButtonAlt>
  </div>
  <LayoutModal v-else title="Sign up" :show="true">
    <template v-slot:body>
      <LayoutForm>
        <MessageError v-if="error">{{ error }}</MessageError>
        <InputString
          v-model="email"
          label="Email adress"
          placeholder="Enter valid email address"
          help="Please enter your email address"
        />
        <InputPassword
          v-model="password"
          label="Password"
          placeholder="Enter password"
          help="Please enter the password"
        />
        <InputPassword
          v-model="password2"
          label="Password Repeat"
          placeholder="Enter password"
          help="Please enter the password again"
          @keyup.enter="signup"
        />
      </LayoutForm>
    </template>
    <template v-slot:footer>
      <ButtonAlt @click="cancel">Cancel</ButtonAlt>
      <ButtonAction @click="signup">Sign up</ButtonAction>
    </template>
  </LayoutModal>
</template>

<script>
import ButtonAction from '../elements/ButtonAction.vue'
import ButtonAlt from '../elements/ButtonAlt.vue'
import InputString from '../elements/InputString.vue'
import InputPassword from '../elements/InputPassword.vue'
import MessageError from '../elements/MessageError.vue'
import MessageSuccess from '../elements/MessageSuccess.vue'
import LayoutForm from '../elements/LayoutForm.vue'
import Spinner from '../elements/Spinner.vue'
import LayoutModal from '../elements/LayoutModal.vue'

import { request } from 'graphql-request'

const endpoint = '/api/graphql'

export default {
  components: {
    ButtonAction,
    ButtonAlt,
    InputPassword,
    InputString,
    MessageError,
    MessageSuccess,
    LayoutForm,
    Spinner,
    LayoutModal
  },
  data: function () {
    return {
      email: null,
      password: null,
      password2: null,
      loading: false,
      error: null,
      success: null
    }
  },
  methods: {
    signup () {
      if (
        this.email == null ||
        this.password == null ||
        this.password2 == null
      ) {
        this.error =
          'Error: valid email address and password should be filled in'
      } else if (this.password !== this.password2) {
        this.error = 'Error: Passwords entered must be the same'
      } else {
        this.error = null
        this.loading = true
        request(
          endpoint,
          `mutation{signup(email: "${this.email}", password: "${this.password}"){status}}`
        )
          .then(data => {
            if (data.signup.status === 'SUCCESS') {
              this.success = 'Success. Signed up with email: ' + this.email
            } else this.error = 'Signup failed: ' + data.signup.message
          })
          .catch(
            error => (this.error = 'Sign up failed: ' + error.response.message)
          )
        this.loading = false
      }
    },
    cancel () {
      /**
       * when cancel is pushed
       */
      this.error = null
      this.$emit('cancel')
    }
  }
}
</script>

<docs>
Example
```
<template>
  <div>
    <ButtonAction v-if="display == false" @click="display=true">Show</ButtonAction>
    <SignupForm v-else @signup="SignupTest" @cancel="display = false" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      display: false,
      email: null
    };
  },
  methods: {
    SignupTest(email, password) {
      alert("sign up with email " + email + " and password " + password);
      this.email = email;
    }
  }
};
</script>
```

</docs>

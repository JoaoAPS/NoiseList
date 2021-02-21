<template>
	<b-container >
		<b-row>
			<b-col cols="8" offset="2">
				<b-form class='my-form'>
					<b-form-group label="Password" label-for="password" class="my-form-group">
						<b-form-input
							id="password"
							type="password"
							:state="wrong ? false : null"
							v-model="password_text"
						></b-form-input>
					</b-form-group>
					
					<b-button variant="primary" @click='check_password'>Submit!</b-button>
				</b-form>
				
				<span class="text-danger" v-if="wrong">
					Wrong password!
				</span>
			</b-col>
			
		</b-row>
	</b-container>
</template>

<script>
import Axios from "axios"

export default {
	name: "Authentication",
	
	data() {
		return {
			password_text: '',
			wrong: false,
		}
	},
	
	methods: {
		async check_password() {
			const result = await Axios.post("/api/check_password", {password: this.password_text})
			
			if (result.data.correct == 1) {
				localStorage.token = result.data.token
				this.$router.push('/')
			} else {
				this.wrong = true
			}
		}
	},
	
	watch: {
		password_text() {
			this.wrong = false
		}
	}
}

</script>

<style scoped>
	.my-form {
		margin-top: 200px;
		text-align: center;
	}
	
	.my-form-group {
		text-align: center;
	}
</style>
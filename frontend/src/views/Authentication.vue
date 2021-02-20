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
export default {
	name: "Authentication",
	
	data() {
		return {
			password_text: '',
			wrong: false,
		}
	},
	
	methods: {
		check_password() {
			if (this.password_text === process.env.VUE_APP_PASSWORD) {
				localStorage.token = process.env.VUE_APP_SECRET_TOKEN
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
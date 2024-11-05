<script>
export default {
	data() {
		return {
			isFooterOpen: false,
		};
	},
	methods: {
		toggleFooter() {
			this.isFooterOpen = !this.isFooterOpen;
		},
	},
};
</script>
<template>
	<div class="footer-wrapper">
		<footer :class="['footer', { is_open: isFooterOpen }]">
			<div class="footer-header text-center" @click="toggleFooter">
				<h2>Contattaci</h2>
				<svg
					class="toggle_icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					:class="{ rotated: !isFooterOpen }">
					<path d="M12 16l-8-8h16z" />
				</svg>
			</div>

			<transition name="fade">
				<div v-if="isFooterOpen" class="footer-content text-center">
					<p>
						Contattaci per ulteriori informazioni o seguici sui nostri canali
						social.
					</p>
					<div class="social-icons">
						<a href="#" class="social-icon">
							<svg viewBox="0 0 24 24"><!-- Facebook Icon --></svg>
						</a>
						<a href="#" class="social-icon">
							<svg viewBox="0 0 24 24"><!-- Twitter Icon --></svg>
						</a>
						<a href="#" class="social-icon">
							<svg viewBox="0 0 24 24"><!-- Instagram Icon --></svg>
						</a>
					</div>
					<router-link to="/contact-us" class="cta-button text-center"
						>Contattaci</router-link
					>
				</div>
			</transition>
		</footer>
	</div>
</template>

<style scoped>


.footer {
	background: linear-gradient(
		45deg,
		#000000,
		#2f4f2f
	); /* Marrone scuro e verde foresta */
	color: #fff;
	padding: 20px;
	
	width: 100%;
	transition: height 0.5s ease, background 0.5s ease;
	height: 80px;
	overflow: hidden;
}

.footer.is_open {
	height: 320px;
	background: linear-gradient(
		135deg,
		#000000,
		#2f4f2f
	); /* Aggiunto un tocco di blu-grigio per transizione */
}

.footer-header h2 {
	font-size: 1.2rem;
	margin: 0;
	color: #d4af37; /* Oro per un look lussuoso */
}

.toggle_icon {
	fill: #d4af37; /* Oro per l'icona */
	width: 24px;
	height: 24px;
	transition: transform 0.3s ease, fill 0.3s ease;
}

.toggle_icon:hover {
	fill: #e06a1b; /* Rosso borgogna quando hover */
}

.toggle_icon.rotated {
	transform: rotate(180deg);
}

.footer-content {
	margin-top: 20px;
	font-size: 1rem;
	opacity: 1;
	animation: fadeIn 0.6s forwards;
}

.social-icons {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
}

.social-icon {
	width: 40px;
	height: 40px;
	transition: transform 0.3s ease, fill 0.3s ease;
}

.social-icon svg {
	fill: #fff;
	transition: fill 0.3s ease;
}

.social-icon:hover svg {
	fill: #d4af37; /* Oro sui social icons hover */
}

.cta-button {
	background-color: #000000;
	color: #d4af37;
	text-transform: uppercase;
	padding: 10px 20px;
	border-radius: 4px;
	text-decoration: none;
	font-weight: bold;
	transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
	background-color: #b66834;
	color: #000000;
	transition: all 0.5s ease-in-out;
}
</style>

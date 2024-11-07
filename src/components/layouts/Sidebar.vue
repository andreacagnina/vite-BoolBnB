<script>
export default {
	mounted() {
		var icon = document.getElementById("icon");
		var nav = document.getElementById("nav");
		var blue = document.getElementById("blue");
		var icon1 = document.getElementById("a");
		var icon2 = document.getElementById("b");
		var icon3 = document.getElementById("c");

		// Toggle menu quando l'icona è cliccata
		icon.addEventListener("click", function (event) {
			icon1.classList.toggle("a");
			icon2.classList.toggle("c");
			icon3.classList.toggle("b");
			nav.classList.toggle("show");
			blue.classList.toggle("slide");
		});

		// Chiude il menu quando si clicca fuori
		document.addEventListener("click", function (event) {
			var isClickInsideNav = nav.contains(event.target);
			var isClickInsideIcon = icon.contains(event.target);

			// Se non si clicca sull'icona o sulla navbar, chiudi il menu
			if (
				!isClickInsideNav &&
				!isClickInsideIcon &&
				nav.classList.contains("show")
			) {
				icon1.classList.remove("a");
				icon2.classList.remove("c");
				icon3.classList.remove("b");
				nav.classList.remove("show");
				blue.classList.remove("slide");
			}
		});

		// Chiude la navbar quando si cambia pagina (rotta)
		this.$router.afterEach(() => {
			// Rimuove le classi per chiudere la navbar
			icon1.classList.remove("a");
			icon2.classList.remove("c");
			icon3.classList.remove("b");
			nav.classList.remove("show");
			blue.classList.remove("slide");
		});
	},
};
</script>

<template>
	<header>
		<div class="hamburger-icon" id="icon">
			<div class="icon-1" id="a"></div>
			<div class="icon-2" id="b"></div>
			<div class="icon-3" id="c"></div>
			<div class="clear"></div>
		</div>
		<nav id="nav">
			<ul>
				<li class="me-4" v-for="(item, index) in menuItems" :key="index">
					<router-link :to="{ name: item.name }">{{item.label}}</router-link>
				</li>
			</ul>
		</nav>
		<div class="dark-overlay" id="blue"></div>
	</header>
</template>

<style scoped lang="scss">
    header {
	width: 30%;
	height: 100%;
	position: absolute;
	overflow: auto;
}

.icon-1,
.icon-2,
.icon-3 {
	position: absolute;
	left: 25%;
	top: 50%;
	width: 32px;
	height: 3px;
	background-color: #d4af37; /* Oro per gli hamburger icon */
	transition: all 400ms cubic-bezier(0.84, 0.06, 0.52, 1.8);
}

.icon-1 {
	transform: translateY(-8px);
	animation-delay: 100ms;
}

.icon-3 {
	transform: translateY(8px);
	animation-delay: 250ms;
}

.hamburger-icon {
	position: absolute;
	height: 60px;
	width: 60px;
	top: 10%;
	left: 3%;
	z-index: 1000;
	cursor: pointer;
	border-radius: 50%;
	transition: all 0.2s ease-in-out;
	background: rgba(48, 80, 48, 0.3);
	&:hover {
		transform: scale(1.2);
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
		background: rgba(48, 80, 48, 0.6);
	}
}

.icon-1.a {
	transform: rotate(40deg);
}
.icon-3.b {
	transform: rotate(-40deg);
}
.icon-2.c {
	opacity: 0;
}

.clear {
	clear: both;
}

nav {
	background: linear-gradient(135deg, #000000, #2f4f2f);
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 0%;
	z-index: 10;
	opacity: 0;
	transition: all 600ms cubic-bezier(0.62, 0.04, 0.3, 1.56);
	transition-delay: 100ms;
	ul {
		margin: 0;
		position: absolute;
		top: 30%;
		left: 30%;
		li {
			list-style: none;
			font-size: 24px;
			color: #d4af37; /* Oro per i link */
			line-height: 2.2;
			text-transform: uppercase;
			letter-spacing: 1.7px;

			a:link,
			a:visited {
				text-decoration: none;
				color: #d4af37;
				&:hover {
					color: #e06a1b;
					transition: all 0.3s ease-in-out;
				}
			}
		}
	}
}

nav.show {
	width: 75%;
	opacity: 1;
}

.dark-overlay {
	position: absolute;
	top: 0;
	left: 0;
	background: #000000; /* Verde foresta per un'atmosfera naturale */
	height: 100%;
	width: 0%;
	transition: all 500ms cubic-bezier(0.62, 0.04, 0.3, 1.8);
	transition-delay: 50ms;
	z-index: 5;
	opacity: 1;
}

.dark-overlay.slide {
	width: 50%;
	opacity: 1;
}
</style>
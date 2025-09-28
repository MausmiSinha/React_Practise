//package com.example.products.Config;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import com.example.products.Service.ProductService;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//	
//	@Autowired
//	ProductService productService;
//	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//		http.csrf(customizer-> customizer.disable());
//		http.authorizeHttpRequests(request -> request
//				.anyRequest().permitAll());
//		
//		http.httpBasic(Customizer.withDefaults());
//		http.cors();
//		
//		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//		return http.build();
//		
////		@Bean
////		public AuthenticationProvider authenticationProvider() {
////			DaoAuthenticationProvider provider = new DaoAuthenticationProvider(myUserDetailsService);
////			provider.setPasswordEncoder(null);
////			provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
////			return provider;
////		}
//	}
//	
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//	    CorsConfiguration config = new CorsConfiguration();
//	    config.setAllowedOrigins(List.of("http://localhost:5173")); 
//	    config.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
//	    config.setAllowedHeaders(List.of("*"));
//	    config.setAllowCredentials(true);
//
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    source.registerCorsConfiguration("/**", config);
//	    return source;
//	}
//
//}

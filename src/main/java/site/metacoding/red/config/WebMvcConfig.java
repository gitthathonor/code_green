package site.metacoding.red.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import site.metacoding.red.handler.HelloIntercepter;
import site.metacoding.red.handler.LoginIntercepter;

@Configuration // 메모리에 떠야지 설정파일이 실행되게끔 해야한다.
public class WebMvcConfig implements WebMvcConfigurer{
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 추가적으로 걸고 싶으면 여러개 걸어놓을 수 있다.
		registry.addInterceptor(new LoginIntercepter())
		.addPathPatterns("/s/**");
		registry.addInterceptor(new HelloIntercepter()).addPathPatterns("/hello/**");
//		.addPathPatterns("/admin/**")
//		.excludePathPatterns("/s/boards/**"); 
		// 어떤 주소일 때 이 인터셉터가 동작하나요~? /s/* => /s/boards, /s/users    /s/** => /s/boards/1, /s/users/1/2/3...
	}
}

package com.zamuraev.backendpizzadeliveryapp.security;

import io.jsonwebtoken.Jwts;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class AuthorizationFilter extends BasicAuthenticationFilter {

    private final Environment env;

    public AuthorizationFilter(AuthenticationManager authenticationManager, Environment env) {
        super(authenticationManager);
        this.env =env;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String authorizationHeader = req.getHeader(env.getProperty("authorization.token.header.name"));
        if (authorizationHeader==null || !authorizationHeader.startsWith(env.getProperty("authorization.token.header.prefix"))) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {

        String authorizationHeader = req.getHeader(env.getProperty("authorization.token.header.name"));

        if (authorizationHeader == null) {
            return null;
        }

        String token = authorizationHeader.replace(env.getProperty("authorization.token.header.prefix"), "");

        String userName = Jwts.parser()
                .setSigningKey(env.getProperty("token.secret"))
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        if (userName == null) {
            return null;
        }

        return new UsernamePasswordAuthenticationToken(userName, null, new ArrayList<>());
    }


}

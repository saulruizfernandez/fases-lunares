import{k as ot}from"./@babel-C0HyJZpD.js";var Z={exports:{}};(function(_,ut){(function(){var T=Math.PI,e=Math.sin,i=Math.cos,S=Math.tan,j=Math.asin,y=Math.atan2,q=Math.acos,d=T/180,k=1e3*60*60*24,F=2440588,O=2451545;function $(t){return t.valueOf()/k-.5+F}function b(t){return new Date((t+.5-F)*k)}function A(t){return $(t)-O}var E=d*23.4397;function U(t,n){return y(e(t)*i(E)-S(n)*e(E),i(t))}function I(t,n){return j(e(n)*i(E)+i(n)*e(E)*e(t))}function N(t,n,r){return y(e(t),i(t)*e(n)-S(r)*i(n))}function R(t,n,r){return j(e(n)*e(r)+i(n)*i(r)*i(t))}function B(t,n){return d*(280.16+360.9856235*t)-n}function tt(t){return t<0&&(t=0),2967e-7/Math.tan(t+.00312536/(t+.08901179))}function G(t){return d*(357.5291+.98560028*t)}function K(t){var n=d*(1.9148*e(t)+.02*e(2*t)+3e-4*e(3*t)),r=d*102.9372;return t+n+r+T}function Q(t){var n=G(t),r=K(n);return{dec:I(r,0),ra:U(r,0)}}var h={};h.getPosition=function(t,n,r){var u=d*-r,a=d*n,s=A(t),o=Q(s),c=B(s,u)-o.ra;return{azimuth:N(c,a,o.dec),altitude:R(c,a,o.dec)}};var z=h.times=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]];h.addTime=function(t,n,r){z.push([t,n,r])};var V=9e-4;function nt(t,n){return Math.round(t-V-n/(2*T))}function W(t,n,r){return V+(t+n)/(2*T)+r}function X(t,n,r){return O+t+.0053*e(n)-.0069*e(2*r)}function rt(t,n,r){return q((e(t)-e(n)*e(r))/(i(n)*i(r)))}function et(t){return-2.076*Math.sqrt(t)/60}function at(t,n,r,u,a,s,o){var c=rt(t,r,u),f=W(c,n,a);return X(f,s,o)}h.getTimes=function(t,n,r,u){u=u||0;var a=d*-r,s=d*n,o=et(u),c=A(t),f=nt(c,a),v=W(0,a,f),g=G(v),w=K(g),D=I(w,0),m=X(v,g,w),x,P,p,M,J,C,l={solarNoon:b(m),nadir:b(m-.5)};for(x=0,P=z.length;x<P;x+=1)p=z[x],M=(p[0]+o)*d,J=at(M,a,s,D,f,g,w),C=m-(J-m),l[p[1]]=b(C),l[p[2]]=b(J);return l};function Y(t){var n=d*(218.316+13.176396*t),r=d*(134.963+13.064993*t),u=d*(93.272+13.22935*t),a=n+d*6.289*e(r),s=d*5.128*e(u),o=385001-20905*i(r);return{ra:U(a,s),dec:I(a,s),dist:o}}h.getMoonPosition=function(t,n,r){var u=d*-r,a=d*n,s=A(t),o=Y(s),c=B(s,u)-o.ra,f=R(c,a,o.dec),v=y(e(c),S(a)*i(o.dec)-e(o.dec)*i(c));return f=f+tt(f),{azimuth:N(c,a,o.dec),altitude:f,distance:o.dist,parallacticAngle:v}},h.getMoonIllumination=function(t){var n=A(t||new Date),r=Q(n),u=Y(n),a=149598e3,s=q(e(r.dec)*e(u.dec)+i(r.dec)*i(u.dec)*i(r.ra-u.ra)),o=y(a*e(s),u.dist-a*i(s)),c=y(i(r.dec)*e(r.ra-u.ra),e(r.dec)*i(u.dec)-i(r.dec)*e(u.dec)*i(r.ra-u.ra));return{fraction:(1+i(o))/2,phase:.5+.5*o*(c<0?-1:1)/Math.PI,angle:c}};function H(t,n){return new Date(t.valueOf()+n*k/24)}h.getMoonTimes=function(t,n,r,u){var a=new Date(t);u?a.setUTCHours(0,0,0,0):a.setHours(0,0,0,0);for(var s=.133*d,o=h.getMoonPosition(a,n,r).altitude-s,c,f,v,g,w,D,m,x,P,p,M,J,C,l=1;l<=24&&(c=h.getMoonPosition(H(a,l),n,r).altitude-s,f=h.getMoonPosition(H(a,l+1),n,r).altitude-s,w=(o+f)/2-c,D=(f-o)/2,m=-D/(2*w),x=(w*m+D)*m+c,P=D*D-4*w*c,p=0,P>=0&&(C=Math.sqrt(P)/(Math.abs(w)*2),M=m-C,J=m+C,Math.abs(M)<=1&&p++,Math.abs(J)<=1&&p++,M<-1&&(M=J)),p===1?o<0?v=l+M:g=l+M:p===2&&(v=l+(x<0?J:M),g=l+(x<0?M:J)),!(v&&g));l+=2)o=f;var L={};return v&&(L.rise=H(a,v)),g&&(L.set=H(a,g)),!v&&!g&&(L[x>0?"alwaysUp":"alwaysDown"]=!0),L},_.exports=h})()})(Z);var it=Z.exports;const ct=ot(it);export{ct as S};

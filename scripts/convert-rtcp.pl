#!/usr/bin/perl

use JSON; # imports encode_json, decode_json, to_json and from_json.
use Digest::MD5;
use MIME::Base64;
use Time::HiRes;
use POSIX qw/floor/;

$timediff = 0;

%PROTO = {};
$PROTO{"udp"} = "udp";
$PROTO{"tcp"} = "udp";
$PROTO{"vlan"} = "vlan";
$PROTO{"eth"} = "eth";
$PROTO{"sctp"} = "sctp";
$PROTO{"tcp"} = "tcp";
$PROTO{"ip"} = "ip";
$PROTO{"frame"} = "frame";

open(FILE, "rtcp.json");
while($line=<FILE>){

    my $out = from_json ($line);
    my $hash = $out->{rtcp}{data};
    @ldata = @$hash;
    
    foreach $el (@ldata) {
      my %lhash = %$el;    
      $raw = $lhash{raw};
      my $out = from_json ($raw);
      my $src_ip =  $lhash{"srcIp"};
      my $dst_ip =  $lhash{"dstIp"};
      my $src_port =  $lhash{"srcPort"};
      my $dst_port =  $lhash{"dstPort"};

print<<END
},{
        // RTCP Report
        rcinfo: {
            type: 'HEP',
            version: 3,
            payload_type: 'JSON',
            captureId: '2001',
            capturePass: 'myHep',
            ip_family: 2,
            protocol: 17,
            proto_type: 5,
            srcIp: '$src_ip',
            dstIp: '$dst_ip',
            srcPort: $src_port,
            dstPort: $dst_port,
            correlation_id: call_id
       },
       pause: 100,
       payload: '$raw'
END
    }
}
close(FILE);
